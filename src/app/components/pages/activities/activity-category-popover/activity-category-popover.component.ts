import { Component, OnInit, Input } from '@angular/core';

import { PopoverController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { ActivityCategory } from 'src/app/models/activity.model';
import { fetchUpdateActivityCategory, removeActivityCategoriesConfirmation } from 'src/app/store/actions/activity.actions';
import { ActivityCategoryEditNamePage } from 'src/app/modals/activities/activity-category-edit-name/activity-category-edit-name.page';

@Component({
  selector: 'app-activity-category-popover',
  templateUrl: './activity-category-popover.component.html',
  styleUrls: ['./activity-category-popover.component.scss'],
})
export class ActivityCategoryPopoverComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;

  constructor(private store: Store, private popoverController: PopoverController, private modalController: ModalController) { }

  ngOnInit() {
  }

  async onUpdate() {
    this.popoverController.dismiss();

    const modal= await this.modalController.create({
      component: ActivityCategoryEditNamePage,
      componentProps: { categoryName: this.activityCategory.category },
      cssClass: 'activity-edit-name-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(fetchUpdateActivityCategory({ activityCategoryId: this.activityCategory.Id, fields: data.fields }));
    }
  }

  async onRemove() {
    this.popoverController.dismiss();
    this.store.dispatch(removeActivityCategoriesConfirmation({ activityCategory: this.activityCategory }));
  }
}
