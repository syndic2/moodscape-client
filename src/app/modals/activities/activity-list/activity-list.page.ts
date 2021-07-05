import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectKeepedActivities } from 'src/app/store/selectors/user-activities.selectors';

import { ActivityCategory } from 'src/app/models/activity.model';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
import { createActivityCategory } from 'src/app/store/actions/user-activities.actions';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  @Input() activityCategory: ActivityCategory;

  public activities: any[]= [];
  private createActivityCategoryListener: Subscription= null;
  public selectAll: boolean= false;

  constructor(
    private store: Store,
    private router: Router,
    private modalController: ModalController,
    private userActivitiesService: UserActivitiesService) { }

  ngOnInit() {
    this.store.select(selectKeepedActivities).pipe(
      map(res => res.map((object, index) => ({ ...object, isChecked: false }))
    )).subscribe(res => {
      this.activities= res;
    });
  }

  ionViewWillLeave() {
    this.createActivityCategoryListener && this.createActivityCategoryListener.unsubscribe();
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSelectAll() {
    this.activities.forEach(object => object.isChecked= this.selectAll);
  }

  onCreate() {
    this.modalController.dismiss();
    this.activityCategory.activities= this.activities.filter(object => object.isChecked);
    this.store.dispatch(createActivityCategory({ activityCategory: this.activityCategory }));
    this.router.navigate(['/settings/activities/activity-category', this.activityCategory.Id]);
  }
}
