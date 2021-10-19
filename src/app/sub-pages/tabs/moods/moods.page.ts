import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { fetchMoods } from 'src/app/store/actions/mood.actions';
import { getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss']
})
export class MoodsPage implements OnInit {
  public groupedMoods: {}= {};
  private groupedMoodsSubscription: Subscription;
  public sortDescObjectKeys= sortDescObjectKeys;

  constructor(
    private store: Store, 
    public utilitiesService: UtilitiesService, 
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {    
    this.groupedMoodsSubscription= this.store
      .select(getGroupedMoodsByDate('moods'))
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res) {
        this.store.dispatch(fetchMoods());
      }

      this.groupedMoods= res;
    });
  }

  ionViewWillLeave() {
    this.groupedMoodsSubscription && this.groupedMoodsSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    event.target.complete();
  }
}
