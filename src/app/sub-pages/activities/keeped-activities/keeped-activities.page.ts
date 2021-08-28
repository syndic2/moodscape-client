import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Activity } from 'src/app/models/activity.model';
import { fetchActivitiesNoneCategory } from 'src/app/store/actions/activity.actions';
import { getKeepedActivities } from 'src/app/store/selectors/activity.selectors';

@Component({
  selector: 'app-keeped-activities',
  templateUrl: './keeped-activities.page.html',
  styleUrls: ['./keeped-activities.page.scss'],
})
export class KeepedActivitiesPage implements OnInit {
  public keepedActivities$: Observable<Activity[]>= this.store.select(getKeepedActivities);

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
    event.target.complete();
  }
}
