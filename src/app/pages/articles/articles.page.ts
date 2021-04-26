import { Component, OnInit, ViewChild } from '@angular/core';

import { IonInfiniteScroll } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.page.html',
	styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
	@ViewChild(IonInfiniteScroll, {  static: false }) infiniteScroll: IonInfiniteScroll;

	public articles: Article[] = [];
	public sliderOptions = {
		slidesPerView: 1,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: true
	};
	public showInfiniteScroll: boolean= true;
	private getArticlesListener: Subscription;
	private offset: number= 0;
	private limit: number= 5;

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.resetLoadPage();
		this.getArticlesListener= this.articleService.getAll({}, this.offset, this.limit).subscribe((res: Article[]) => {
			this.articles= res;
		});
	}

	ionViewWillLeave() {
		this.getArticlesListener.unsubscribe();
	}

	private resetLoadPage() {
		//this.infiniteScroll.disabled= false;
		this.showInfiniteScroll= true;
		this.offset= 0;
		this.limit= 5;
	}

	loadMore(event) {
		this.offset+= 5;
		this.getArticlesListener= this.articleService.getAll({}, this.offset, this.limit).subscribe((res: Article[]) => {
			this.articles= this.articles.concat(res);
			event.target.complete();
		});

		if (this.offset === 10 - this.limit) {
			//this.infiniteScroll.disabled= true;
			this.showInfiniteScroll= false;
		}
	}
}
