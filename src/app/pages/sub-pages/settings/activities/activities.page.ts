import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { setUserActivities, reorderUserActivities } from 'src/app/store/actions/user-activities.actions';
import { selectUserActivities } from 'src/app/store/selectors/user-activities.selectors';

import { ActivityCategory } from 'src/app/models/activities/activity-category.model';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public activityCategories$: Observable<ActivityCategory[]>= this.store.select(selectUserActivities);
  private getUserActivitiesListener: Subscription= null;

  constructor(private store: Store, private userActivitiesService: UserActivitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.getUserActivitiesListener === null) {
      this.getUserActivitiesListener= this.userActivitiesService.getActivities().subscribe(res => {
        this.store.dispatch(setUserActivities({ userActivities: res.activityCategories }));
      });
    }
  }

  ionViewWillLeave() {
    this.getUserActivitiesListener && this.getUserActivitiesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.getUserActivitiesListener= this.userActivitiesService.getActivities().subscribe(res => {
      this.store.dispatch(setUserActivities({ userActivities: res.activityCategories }));
      event && event.target.complete();
    });
  }

  reorderCategory(event: CustomEvent<ItemReorderEventDetail>) {
    this.store.dispatch(reorderUserActivities({ from: event.detail.from, to: event.detail.to }));
    event.detail.complete();
  }
}
