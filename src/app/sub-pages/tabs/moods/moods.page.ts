import { Component, OnInit } from '@angular/core';

import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { sortDescObjectKeys } from 'src/app/utilities/helpers';
import { fetchMoods } from 'src/app/store/actions/mood.actions';
import { getGroupedMoodsByDate } from 'src/app/store/selectors/mood.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss']
})
export class MoodsPage implements OnInit {
  public groupedMoods: {}= {};
  private moodSubscription: Subscription;
  public sortDescObjectKeys= sortDescObjectKeys;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchMoods());
    this.moodSubscription= this.store.select(getGroupedMoodsByDate('moods')).subscribe(res => {
      if (JSON.stringify(res) !== '{}') {
        this.groupedMoods= res;
        this.utilitiesService.resetSkeletonLoading();
      }
    });
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    event.target.complete();
  }
}
