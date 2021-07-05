import { Component, OnInit, Input } from '@angular/core';

import { PopoverController, AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { moveActivitiesIntoCategory, updateActivity, removeActivities } from 'src/app/store/actions/user-activities.actions';

import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
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

  constructor(
    private store: Store,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private modalController: ModalController,
    private userActivitiesService: UserActivitiesService
  ) { }

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

    if (data) {
      this.store.dispatch(moveActivitiesIntoCategory({
        activities: [this.activity],
        ...this.activityCategory && { fromCategoryId: this.activityCategory.Id },
        toCategoryId: data.toCategoryId
      }));
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

    if (data) {
      this.store.dispatch(updateActivity({
        activityId: this.activity.Id,
        fields: data.fields,
        ...(this.activityCategory) && { activityCategoryId: this.activityCategory.Id }
      }));
    }
  }

  async onRemove() {
    this.popoverController.dismiss();

    const alert= await this.alertController.create({
      subHeader: 'Anda akan menghapus aktivitas ini',
      message: 'Apakah anda yakin ingin menghapus aktivitas ini?',
      buttons: [
        {
          text: 'Tetap simpan',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.store.dispatch(removeActivities({
              activityIds: [this.activity.Id],
              ...this.activityCategory && { activityCategoryId: this.activityCategory.Id }
            }));
          }
        }
      ]
    });
    alert.present();
  }
}
