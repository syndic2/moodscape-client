import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { fetchArchivedArticles, removeArchivedArticlesConfirmation } from 'src/app/store/actions/article.actions';
import { getArchivedArticles } from 'src/app/store/selectors/article.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {
  public articles: Article[]= [];
  private articlesSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
<<<<<<< HEAD
  }

  ionViewWillEnter() {
    this.articlesSubscription= this.store.select(getArchivedArticles).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchArchivedArticles());
      } else {
        this.articles= res;
      }
    });
  }

  ionViewWillLeave() {
    this.articlesSubscription && this.articlesSubscription.unsubscribe();
=======
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchArchivedArticles());
    this.articlesSubscription= this.store.select(getArchivedArticles).subscribe(res => {
      this.articles= res;
      this.utilitiesService.resetSkeletonLoading();
    });
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  }

  pullRefresh(event) {
    this.store.dispatch(fetchArchivedArticles());
    event.target.complete();
  }

  onRemove(article: Article) {
    this.store.dispatch(removeArchivedArticlesConfirmation({ articleIds: [article.Id] }));
  }
}
