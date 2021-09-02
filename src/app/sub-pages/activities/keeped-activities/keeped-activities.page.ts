import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Activity } from 'src/app/models/activity.model';
import { fetchActivitiesNoneCategory } from 'src/app/store/actions/activity.actions';
import { getKeepedActivities } from 'src/app/store/selectors/activity.selectors';

@Component({
  selector: 'app-keeped-activities',
  templateUrl: './keeped-activities.page.html',
  styleUrls: ['./keeped-activities.page.scss'],
})
export class KeepedActivitiesPage implements OnInit {
  public keepedActivities: Activity[]= [];
  private keepedActivitiesSubscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.keepedActivitiesSubscription= this.store.select(getKeepedActivities).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
      } else {
        this.keepedActivities= res;
      }
    });
  }

  ionViewWillLeave() {
    this.keepedActivitiesSubscription && this.keepedActivitiesSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
    event.target.complete();
  }
}
