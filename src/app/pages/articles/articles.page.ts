import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.page.html',
	styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
	public articles: Article[] = [];
	public sliderOptions = {
		slidesPerView: 1,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: true
	};
	public disableLoadMore: boolean= true;
	private offset: number= 0;
	private limit: number= 10;

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.disableLoadMore= false;
		this.articleService.getAll({}, this.offset, this.limit).subscribe((res: Article[]) => {
			this.articles= res;
		});
	}

	loadMore(event) {
		this.offset+= 5;
		this.articleService.getAll({}, this.offset, this.limit).subscribe((res: Article[]) => {
			this.articles= this.articles.concat(res);
			event.target.complete();
		});

		if (this.offset === 10 - this.limit) {
			this.disableLoadMore= true;
		}
	}
}
