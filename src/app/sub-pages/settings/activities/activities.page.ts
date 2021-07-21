import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { setUserActivities, reorderActivityCategory } from 'src/app/store/actions/activities.actions';
import { selectUnkeepedActivities } from 'src/app/store/selectors/activities.selectors';

import { ActivityCategory } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  
  public activityCategories$: Observable<ActivityCategory[]>= this.store.select(selectUnkeepedActivities);
  private getActivitiesListener: Subscription= null;

  constructor(private store: Store, private activityService: ActivityService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.getActivitiesListener === null) {
      this.getActivitiesListener= this.activityService.getActivities().subscribe(res => {
        this.store.dispatch(setUserActivities({ activities: res.activityCategories }));
      });
    }
  }

  ionViewWillLeave() {
    this.getActivitiesListener && this.getActivitiesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.getActivitiesListener= this.activityService.getActivities().subscribe(res => {
      this.store.dispatch(setUserActivities({ activities: res.activityCategories }));
      event && event.target.complete();
    });
  }

  reorderCategory(event) {
    this.store.dispatch(reorderActivityCategory({ from: event.detail.from, to: event.detail.to }));
    event.detail.complete();
  }
}
