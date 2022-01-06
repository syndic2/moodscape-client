import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Habit, HabitFilter } from 'src/app/models/habit.model';
import { getHabitSearchResults } from 'src/app/store/selectors/habit.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-search-results-habit',
  templateUrl: './search-results-habit.page.html',
  styleUrls: ['./search-results-habit.page.scss'],
})
export class SearchResultsHabitPage implements OnInit {
  public filters: HabitFilter;
  public searchResults: Habit[] = [];
  private searchResultsSubscription: Subscription;

  constructor(private store: Store, private router: Router, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.filters = <HabitFilter>this.router.getCurrentNavigation().extras.state;
    }
  }

  ionViewWillEnter() {
    this.searchResultsSubscription = this.store.select(getHabitSearchResults).subscribe(res => {
      this.searchResults = res;
    });
  }

  ionViewWillLeave() {
    this.searchResultsSubscription && this.searchResultsSubscription.unsubscribe();
  }
}
