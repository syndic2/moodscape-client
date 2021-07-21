import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { selectKeepedActivities } from 'src/app/store/selectors/activities.selectors';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-keeped-activities',
  templateUrl: './keeped-activities.page.html',
  styleUrls: ['./keeped-activities.page.scss'],
})
export class KeepedActivitiesPage implements OnInit {
  public keepedActivities$: Observable<Activity[]>= this.store.select(selectKeepedActivities);
  private getKeepedActivities: Subscription= null;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  ionViewDidLeave() {
    this.getKeepedActivities && this.getKeepedActivities.unsubscribe();
  }
}
