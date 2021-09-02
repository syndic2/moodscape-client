import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs'

import { Article } from 'src/app/models/article.model';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { getArticleSearchResults } from 'src/app/store/selectors/article.selectors';

<<<<<<< HEAD
=======
@UntilDestroy({ checkProperties: true })
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
@Component({
  selector: 'app-search-results-article',
  templateUrl: './search-results-article.page.html',
  styleUrls: ['./search-results-article.page.scss'],
})
export class SearchResultsArticlePage implements OnInit {
  public searchText: string= '';
  public articles: Article[]= [];
  private searchResultsSubscription: Subscription;

  constructor(private store: Store, private router: Router, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.searchText= this.router.getCurrentNavigation().extras.state.searchText;
    }
  }

  ionViewWillEnter() {
    this.searchResultsSubscription= this.store.select(getArticleSearchResults).subscribe(res => {
      this.articles= res;
    });
  }
<<<<<<< HEAD

  ionViewWillLeave() {
    this.searchResultsSubscription && this.searchResultsSubscription.unsubscribe();
  }
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
}
