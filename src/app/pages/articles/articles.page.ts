import { Component, OnInit, ViewChild } from '@angular/core';

import { IonContent, IonInfiniteScroll } from '@ionic/angular';

import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article, ArticlePagination } from 'src/app/models/article.model';
import { fetchArticles, fetchMoreArticles } from 'src/app/store/actions/article.actions';
import { getArticlePagination } from 'src/app/store/selectors/article.selectors';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-articles',
	templateUrl: './articles.page.html',
	styleUrls: ['./articles.page.scss']
})
export class ArticlesPage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
	@ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public articles: Article[]= [];
	private articlePaginationSubscription: Subscription;
  public sliderOptions = {
		slidesPerView: 1,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: true
	};
	public showInfiniteScroll: boolean= true;
	private offset: number= 0;
	private limit: number= 10;
  private page: number= 0;
  private maxPage: number= 0;
  
	constructor(private store: Store) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
    this.store.dispatch(fetchArticles({ offset: this.offset, limit: this.limit }));
    this.articlePaginationSubscription= this.store.select(getArticlePagination).subscribe(res => {
      this.offset= res.offset;
      this.limit= res.limit;
      this.maxPage= res.maxPage;
      this.articles= res.articles;
    });
	}

  pullRefresh(event) {
    this.resetLoadPage();
    this.store.dispatch(fetchArticles({ offset: this.offset, limit: this.limit }));
    event && event.target.complete();
  }

	resetLoadPage() {
		this.showInfiniteScroll= true;
		this.offset= 0;
		this.limit= 10;
    this.page= 0;
    this.maxPage= 0;
	}

	loadMore(event) {
    event.target.complete();
	}

  onLoadMore() {
    this.page++;
    this.offset+= 10;
    this.store.dispatch(fetchMoreArticles({ offset: this.offset, limit: this.limit }));
    
    const lastArticleElement= document.getElementById(`article_${this.articles.length-1}`);
    this.content.scrollToPoint(0, lastArticleElement.offsetTop, 1000)
    
    if (this.page === this.maxPage) {
			//this.infiniteScroll.disabled= true;
			this.showInfiniteScroll= false;
		}
  }
}
