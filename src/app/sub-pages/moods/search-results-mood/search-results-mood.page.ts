import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { MoodFilter } from 'src/app/models/mood.model';
import { getMoodSearchResults, getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
=======
import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { MoodFilter } from 'src/app/models/mood.model';
import { getMoodSearchResults, getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-search-results-mood',
  templateUrl: './search-results-mood.page.html',
  styleUrls: ['./search-results-mood.page.scss'],
})
export class SearchResultsMoodPage implements OnInit {
  public groupedSearchResults: {}= {};
  public searchResultsCount: Observable<number>= this.store.select(getMoodSearchResults).pipe(map(res => res.length));
  private searchResultsSubscription: Subscription;
  public filters: MoodFilter;
  public sortDescObjectKeys= sortDescObjectKeys;

  constructor(private store: Store, private router: Router, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.filters= <MoodFilter>this.router.getCurrentNavigation().extras.state;
    }
  }

  ionViewWillEnter() {
    this.searchResultsSubscription= this.store.select(getGroupedMoodsByDate('mood-search-results')).subscribe(res => {
      this.groupedSearchResults= res;
    });
  }
<<<<<<< HEAD

  ionViewWillLeave() {
    this.searchResultsSubscription && this.searchResultsSubscription.unsubscribe();
  }
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
}
