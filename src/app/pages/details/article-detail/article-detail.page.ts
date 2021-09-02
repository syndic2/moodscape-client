import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { fetchArticleByUrlName, fetchArchiveArticles } from 'src/app/store/actions/article.actions';
import { getArticleByUrlName } from 'src/app/store/selectors/article.selectors';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.page.html',
	styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  public article: Article;
  private articleSubscription: Subscription;
  private urlName: string;

	constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
    this.urlName= this.activatedRoute.snapshot.paramMap.get('urlName');
  }

  ionViewWillEnter() {
    this.articleSubscription= this.store.select(getArticleByUrlName(this.urlName)).subscribe(res => {
<<<<<<< HEAD
      if (res !== null) {
        this.article= res;
      }
    });
  }

  ionViewWillLeave() {
    this.articleSubscription && this.articleSubscription.unsubscribe();
  }
=======
      this.article= res;
    });
  }
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

  pullRefresh(event) {
    this.store.dispatch(fetchArticleByUrlName({ urlName: this.urlName }));
    event.target.complete();
  }

  onArchive() {
    this.store.dispatch(fetchArchiveArticles({ articleIds: [this.article.Id] }));
  }
}
