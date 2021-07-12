import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';;
import { Observable } from 'rxjs';

import { selectSearchedMoods } from 'src/app/store/selectors/user-moods-selectors';
import { Mood, FilterMood } from 'src/app/models/mood.model'

@Component({
  selector: 'app-search-results-mood',
  templateUrl: './search-results-mood.page.html',
  styleUrls: ['./search-results-mood.page.scss'],
})
export class SearchResultsMoodPage implements OnInit {
  public searchResults$: Observable<Mood[]>= null;
  public filters: FilterMood;
  public isLoading: boolean= false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.filters= <FilterMood>this.router.getCurrentNavigation().extras.state;
      this.searchResults$= this.store.select(selectSearchedMoods({ ...this.filters }));
    }
  }
}
