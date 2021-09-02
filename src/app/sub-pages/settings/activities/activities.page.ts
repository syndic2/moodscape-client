import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup } from '@ionic/angular';

import { Store } from '@ngrx/store';
<<<<<<< HEAD
import { Subscription } from 'rxjs';

import { fetchActivityCategories, fetchReOrderActivityCategory, reorderActivityCategory } from 'src/app/store/actions/activity.actions';
=======
import { Observable } from 'rxjs';

import { fetchActivityCategories, fetchActivitiesNoneCategory, fetchReOrderActivityCategory, reorderActivityCategory } from 'src/app/store/actions/activity.actions';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { getActivityCategories } from 'src/app/store/selectors/activity.selectors';

import { ActivityCategory } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
  
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
<<<<<<< HEAD

  public activityCategories: ActivityCategory[]= [];
  private activityCategoriesSubscription: Subscription;
  private reordering: boolean= false;

=======
  
  public activityCategories$: Observable<ActivityCategory[]>= this.store.select(getActivityCategories);
  private reordering: boolean= false;

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  constructor(private store: Store) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
<<<<<<< HEAD
    this.activityCategoriesSubscription= this.store.select(getActivityCategories).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchActivityCategories());
      } else {
        this.activityCategories= res;
      }
    });
  }

  ionViewWillLeave() {
    this.activityCategoriesSubscription && this.activityCategoriesSubscription.unsubscribe();
    //if (this.reordering) {
    //  this.store.dispatch(fetchReOrderActivityCategory());
    //}
=======
    this.store.dispatch(fetchActivityCategories());
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
  }

  ionViewWillLeave() {
    if (this.reordering) {
      this.store.dispatch(fetchReOrderActivityCategory());
    }
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivityCategories());
<<<<<<< HEAD
    event.target.complete();
=======
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
    event && event.target.complete();
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  }
  
  reorderCategory(event) {
<<<<<<< HEAD
    //this.reordering= true;
    //this.store.dispatch(reorderActivityCategory({ from: event.detail.from, to: event.detail.to }));
=======
    this.reordering= true;
    this.store.dispatch(reorderActivityCategory({ from: event.detail.from, to: event.detail.to }));
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    event.detail.complete();
  }
}
