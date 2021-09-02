import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { fetchArchivedArticles, removeArchivedArticlesConfirmation } from 'src/app/store/actions/article.actions';
import { getArchivedArticles } from 'src/app/store/selectors/article.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

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
  }

  pullRefresh(event) {
    this.store.dispatch(fetchArchivedArticles());
    event.target.complete();
  }

  onRemove(article: Article) {
    this.store.dispatch(removeArchivedArticlesConfirmation({ articleIds: [article.Id] }));
  }
}
