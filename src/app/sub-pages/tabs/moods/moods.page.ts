import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { fetchMoods } from 'src/app/store/actions/mood.actions';
import { getMoods, getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss']
})
export class MoodsPage implements OnInit {
  public groupedMoods: {}= {};
  private moodsSubscription: Subscription;
  private groupedMoodsSubscription: Subscription;
  public sortDescObjectKeys= sortDescObjectKeys;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    event.target.complete();
  }
}
