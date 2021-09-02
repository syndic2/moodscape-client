import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fetchActivityCategories, fetchReOrderActivityCategory, reorderActivityCategory } from 'src/app/store/actions/activity.actions';
import { getActivityCategories } from 'src/app/store/selectors/activity.selectors';

import { ActivityCategory } from 'src/app/models/activity.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
  
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public activityCategories: ActivityCategory[]= [];
  private activityCategoriesSubscription: Subscription;
  private reordering: boolean= false;

  constructor(private store: Store, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activityCategoriesSubscription= this.store
      .select(getActivityCategories)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
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
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivityCategories());
    event.target.complete();
  }
  
  reorderCategory(event) {
    //this.reordering= true;
    //this.store.dispatch(reorderActivityCategory({ from: event.detail.from, to: event.detail.to }));
    event.detail.complete();
  }
}
