import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Store } from '@ngrx/store';

import { fetchSearchArticle, fetchSearchArchivedArticles } from 'src/app/store/actions/article.actions';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.page.html',
  styleUrls: ['./search-article.page.scss'],
})
export class SearchArticlePage implements OnInit {
  private searchText: string= '';
  public searchOn: string;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.searchOn= this.router.getCurrentNavigation().extras.state.searchOn;
    }
  }

  onSearchChanged(event) {
    this.searchText= event.target.value;
  }
  
  onSearch() {
    const extrasData: NavigationExtras= { state: { searchText: this.searchText } };

    if (this.searchOn) { 
      this.store.dispatch(fetchSearchArchivedArticles({ fields: { title: this.searchText } }));
    } else { 
      this.store.dispatch(fetchSearchArticle({ fields: { title: this.searchText } }));
    }
      

    this.router.navigate(['/articles/search-results'], extrasData);
  }
}
