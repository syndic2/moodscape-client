import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { fetchMoods, fetchMoodsChart } from 'src/app/store/actions/mood.actions';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  public selectedMode: string= 'mood';

  constructor(private store: Store) { }

  ngOnInit() {
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    this.store.dispatch(fetchMoodsChart());
    event.target.complete();
  }

  onSelectMode(mode: string) {
    this.selectedMode= mode;
  }
}
