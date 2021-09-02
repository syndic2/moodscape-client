import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
<<<<<<< HEAD
import { Subscription } from 'rxjs';
=======
import { Observable } from 'rxjs';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

import { Activity } from 'src/app/models/activity.model';
import { fetchActivitiesNoneCategory } from 'src/app/store/actions/activity.actions';
import { getKeepedActivities } from 'src/app/store/selectors/activity.selectors';

@Component({
  selector: 'app-keeped-activities',
  templateUrl: './keeped-activities.page.html',
  styleUrls: ['./keeped-activities.page.scss'],
})
export class KeepedActivitiesPage implements OnInit {
<<<<<<< HEAD
  public keepedActivities: Activity[]= [];
  private keepedActivitiesSubscription: Subscription;
=======
  public keepedActivities$: Observable<Activity[]>= this.store.select(getKeepedActivities);
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
<<<<<<< HEAD
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
=======
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
    event.target.complete();
  }
}
