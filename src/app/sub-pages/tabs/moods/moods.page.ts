import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { fetchMoods } from 'src/app/store/actions/mood.actions';
import { getMoods, getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
=======
import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { fetchMoods } from 'src/app/store/actions/mood.actions';
import { getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss']
})
export class MoodsPage implements OnInit {
  public groupedMoods: {}= {};
<<<<<<< HEAD
  private moodsSubscription: Subscription;
  private groupedMoodsSubscription: Subscription;
=======
  private moodSubscription: Subscription;
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  public sortDescObjectKeys= sortDescObjectKeys;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
<<<<<<< HEAD
    this.moodsSubscription= this.store.select(getMoods).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchMoods());
      }
    });
    this.groupedMoodsSubscription= this.store.select(getGroupedMoodsByDate('moods')).subscribe(res => {
      if (JSON.stringify(res) !== '{}') {
        this.groupedMoods= res;
      }
    });
  }

  ionViewWillLeave() {
    this.moodsSubscription && this.moodsSubscription.unsubscribe();
    this.groupedMoodsSubscription && this.groupedMoodsSubscription.unsubscribe();
=======
    this.store.dispatch(fetchMoods());
    this.moodSubscription= this.store.select(getGroupedMoodsByDate('moods')).subscribe(res => {
      if (JSON.stringify(res) !== '{}') {
        this.groupedMoods= res;
        this.utilitiesService.resetSkeletonLoading();
      }
    });
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    event.target.complete();
  }
}
