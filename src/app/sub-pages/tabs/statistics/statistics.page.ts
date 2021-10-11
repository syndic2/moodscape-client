import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { fetchMoods, fetchMoodsChart } from 'src/app/store/actions/mood.actions';
import { fetchHabits } from 'src/app/store/actions/habit.actions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  public selectedMode: string= 'mood';
  private getQueryParamsSubscription: Subscription;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getQueryParamsSubscription= this.activatedRoute.queryParams.subscribe(params => {
      if (JSON.stringify(params) !== '{}') {
        this.selectedMode= params['mode'];
      }
    });
  }

  ionViewWillLeave() {
    this.getQueryParamsSubscription && this.getQueryParamsSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    this.store.dispatch(fetchMoodsChart());
    this.store.dispatch(fetchHabits());
    event.target.complete();
  }
}
