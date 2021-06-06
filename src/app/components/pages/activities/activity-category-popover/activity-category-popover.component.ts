import { Component, OnInit, Input } from '@angular/core';

import { PopoverController, AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { updateActivityCategory, removeActivityCategories } from 'src/app/store/actions/user-activities.actions';

import { ActivityCategory } from 'src/app/models/activities/activity-category.model';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
import { ActivityCategoryEditNamePage } from 'src/app/modals/activities/activity-category-edit-name/activity-category-edit-name.page';

@Component({
  selector: 'app-activity-category-popover',
  templateUrl: './activity-category-popover.component.html',
  styleUrls: ['./activity-category-popover.component.scss'],
})
export class ActivityCategoryPopoverComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;

  constructor(
    private store: Store,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private modalController: ModalController,
    private userActivitiesService: UserActivitiesService
  ) { }

  ngOnInit() {
  }

  async onUpdate() {
    this.popoverController.dismiss();

    const modal= await this.modalController.create({
      component: ActivityCategoryEditNamePage,
      componentProps: { activityCategoryName: this.activityCategory.category },
      cssClass: 'activity-edit-name-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();

    if (data) {
      this.store.dispatch(updateActivityCategory({ activityCategoryId: this.activityCategory.Id, fields: data.fields }));
    }
  }

  async onRemove() {
    this.popoverController.dismiss();

    const confirmAlert= await this.alertController.create({
      subHeader: 'Anda akan menghapus kategori aktivitas ini',
      message: 'Apakah anda yakin ingin menghapus kategori aktivitas ini?',
      buttons: [
        {
          text: 'Tetap simpan',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          handler: () => {
            if (this.activityCategory.activities.length > 0) {
              return { reConfirm: true };
            } else {
              this.store.dispatch(removeActivityCategories({ activityCategoryIds: [this.activityCategory.Id ]}));
            }
          }
        }
      ]
    });
    confirmAlert.present();

    const { data }= await confirmAlert.onWillDismiss();

    if (data.reConfirm) {
      const reConfirmAlert= await this.alertController.create({
        subHeader: `Kategori yang akan dihapus memiliki ${this.activityCategory.activities.length} aktivitas`,
        message: 'Apakah anda ingin tetap menyimpan aktivitas?',
        buttons: [
          {
            text: 'Tetap simpan',
            handler: () => {
              this.store.dispatch(removeActivityCategories({ activityCategoryIds: [this.activityCategory.Id], keepActivities: true }));
            }
          },
          {
            text: 'Hapus semua aktivitas',
            handler: () => {
              this.store.dispatch(removeActivityCategories({ activityCategoryIds: [this.activityCategory.Id] }));
            }
          }
        ]
      });
      reConfirmAlert.present();
    }
  }
}
