import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Article } from 'src/app/models/article.model';
import { fetchArchivedArticles, removeArchivedArticlesConfirmation } from 'src/app/store/actions/article.actions';
import { getArchivedArticles } from 'src/app/store/selectors/article.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {
  public articles: Article[]= [];
  private articlesSubscription: Subscription;

  constructor(
    private store: Store, 
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.articlesSubscription= this.store
      .select(getArchivedArticles)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchArchivedArticles());
      } else {
        this.articles= res;
      }
    });
  }

  ionViewWillLeave() {
    this.articlesSubscription && this.articlesSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchArchivedArticles());
    event.target.complete();
  }

  onRemove(article: Article) {
    this.store.dispatch(removeArchivedArticlesConfirmation({ articleIds: [article.Id] }));
  }
}
