import { Component, OnInit, Input } from '@angular/core';

import { PopoverController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { fetchUpdateActivity, removeActivitiesConfirmation, fetchMoveActivitiesIntoCategory } from 'src/app/store/actions/activity.actions';

import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { ActivityCategoryListPage } from 'src/app/modals/activities/activity-category-list/activity-category-list.page';
import { ActivityEditNamePage } from 'src/app/modals/activities/activity-edit-name/activity-edit-name.page';

@Component({
  selector: 'app-activity-popover',
  templateUrl: './activity-popover.component.html',
  styleUrls: ['./activity-popover.component.scss'],
})
export class ActivityPopoverComponent implements OnInit {
  @Input() activity: Activity;
  @Input() activityCategory: ActivityCategory;

  constructor(private store: Store, private popoverController: PopoverController, private modalController: ModalController) { }

  ngOnInit() {}

  async onMoveToAnotherCategory() {
    this.popoverController.dismiss();

    const modal= await this.modalController.create({
      component: ActivityCategoryListPage,
      componentProps: { currentActivityCategory: this.activityCategory },
      cssClass: 'activity-category-list-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.toCategoryId) {
      this.store.dispatch(fetchMoveActivitiesIntoCategory({ activityIds: this.activity.Id, fromCategoryId: this.activityCategory?.Id, toCategoryId: data.toCategoryId }));
    }
  }

  async onUpdate() {
    this.popoverController.dismiss();

    const modal= await this.modalController.create({
      component: ActivityEditNamePage,
      componentProps: { activityName: this.activity.name },
      cssClass: 'activity-edit-name-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.name) {
      this.store.dispatch(fetchUpdateActivity({ activityId: this.activity.Id, fields: data, activityCategoryId: this.activityCategory?.Id }));
    }
  }

  onRemove() {
    this.popoverController.dismiss();
    this.store.dispatch(removeActivitiesConfirmation({ activityIds: [this.activity.Id], activityCategoryId: this.activityCategory?.Id }));
  }
}
