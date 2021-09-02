import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { fetchActivityCategories, fetchActivitiesNoneCategory } from 'src/app/store/actions/activity.actions';
import {
  getActivityCategories,
  getKeepedActivities,
  getCheckedUnkeepedActivities,
  getCheckedKeepedActivities
} from 'src/app/store/selectors/activity.selectors';
import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { ActivityCategoryOptionsPopoverComponent } from '../../pages/moods/activity-category-options-popover/activity-category-options-popover.component';

@Component({
  selector: 'select-activities',
  templateUrl: './select-activities.component.html',
  styleUrls: ['./select-activities.component.scss'],
})
export class SelectActivitiesComponent implements OnInit, OnDestroy {
  @Input() extraButtons: boolean= true;
  @Input() selectedActivities: Activity[]= [];
  @Output() selectActivitiesEvent= new EventEmitter<Activity[]>();

  public activityCategories$: Observable<ActivityCategory[] | any[]>= this.store.select(getActivityCategories);
  public keepedActivities$: Observable<Activity[] | any[]>= this.store.select(getKeepedActivities);
  private activityCategoriesSubscription: Subscription;
  private keepedActivitiesSubscription: Subscription;

  constructor(private store: Store, private popoverController: PopoverController) { }

  ngOnInit() {
    this.activityCategoriesSubscription= this.store.select(getActivityCategories).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchActivityCategories());
      }
    });
    this.keepedActivitiesSubscription= this.store.select(getKeepedActivities).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));
      }
    });

    this.store.dispatch(fetchActivityCategories());
    this.store.dispatch(fetchActivitiesNoneCategory({ fields: { category: '' } }));

    if (this.selectedActivities.length) {
      this.activityCategories$= this.store.select(getCheckedUnkeepedActivities({ selectedActivities: this.selectedActivities }));
      this.keepedActivities$= this.store.select(getCheckedKeepedActivities({ selectedActivities: this.selectedActivities }));
    }
  }

  ngOnDestroy() {
    this.activityCategoriesSubscription && this.activityCategoriesSubscription.unsubscribe();
    this.keepedActivitiesSubscription && this.keepedActivitiesSubscription.unsubscribe();
  }

  async openPopover(event, activityCategory?: ActivityCategory) {
    const popover= await this.popoverController.create({
      event: event,
      component: ActivityCategoryOptionsPopoverComponent,
      componentProps: {
        ...activityCategory && { activityCategory: activityCategory }
      }
    });
    popover.present();
  }

  onSelectActivity(event) {
    const activity: Activity= JSON.parse(event.target.value);

    if (event.target.checked) {
      this.selectedActivities= [...this.selectedActivities, activity];
    } else {
      this.selectedActivities= [...this.selectedActivities.filter(object => object.Id !== activity.Id)];
    }

    this.selectActivitiesEvent.emit(this.selectedActivities);
  }
}
