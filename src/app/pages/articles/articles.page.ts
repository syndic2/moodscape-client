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
	private getArticlesListener: Subscription= null;
	private offset: number= 0;
	private limit: number= 10;
  private page: number= 0;
  private maxPage: number= 0;

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
    if (this.getArticlesListener === null) {
      this.resetLoadPage();
      this.getArticlesListener= this.articleService.getAll({}, this.offset, this.limit).subscribe(res => {
        this.maxPage= res.maxPage;
        this.articles= res.articles;
      });
    }
	}

	ionViewWillLeave() {
		this.getArticlesListener && this.getArticlesListener.unsubscribe();
	}

  pullRefresh(event) {
    this.resetLoadPage();
    this.getArticlesListener= this.articleService.getAll({}, this.offset, this.limit).subscribe(res => {
      this.maxPage= res.maxPage;
      this.articles= res.articles;

      event && event.target.complete();
		});
  }

	resetLoadPage() {
		//this.infiniteScroll.disabled= false;
    this.articles= [];
		this.showInfiniteScroll= true;
		this.offset= 0;
		this.limit= 10;
    this.page= 0;
    this.maxPage= 0;
	}

	loadMore(event) {
    this.page++;
		this.getArticlesListener= this.articleService.getAll({}, this.offset+= 10, this.limit).subscribe(res => {
      this.maxPage= res.maxPage;
      this.articles= this.articles.concat(res.articles);

			event.target.complete();
		});

		if (this.page === this.maxPage) {
			//this.infiniteScroll.disabled= true;
			this.showInfiniteScroll= false;
		}
	}
}
