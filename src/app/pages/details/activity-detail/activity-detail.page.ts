import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ActivityCategory } from 'src/app/models/activity.model';
import { 
  fetchActivity, 
  fetchUpdateActivity, 
  removeActivitiesConfirmation,
  fetchMoveActivitiesIntoCategory
} from 'src/app/store/actions/activity.actions';
import { getActivity } from 'src/app/store/selectors/activity.selectors';
import { ActivityEditNamePage } from 'src/app/modals/activities/activity-edit-name/activity-edit-name.page';
import { ActivityCategoryListPage } from 'src/app/modals/activities/activity-category-list/activity-category-list.page';
import { ActivityIconListPage } from 'src/app/modals/activities/activity-icon-list/activity-icon-list.page';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  public activity: any;
  public activityCategory: ActivityCategory;
  private activitySubscription: Subscription;
  private activityId: number;

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    this.activityId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.activitySubscription= this.store.select(getActivity({ Id: this.activityId })).subscribe(res => {
      if (res !== null) {
        this.activity= res;
        this.activityCategory= res?.activityCategory;
      }
    });
  }

  ionViewWillLeave() {
    this.activitySubscription && this.activitySubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivity({ activityId: this.activityId, activityCategoryId: this.activityCategory?.Id }));
    event.target.complete();
  }

  async onUpdateName() {
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

  async onMoveToAnotherCatgory() {
    const modal= await this.modalController.create({
      component: ActivityCategoryListPage,
      componentProps: { currentActivityCategory: this.activityCategory }
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.toCategoryId) {
      this.store.dispatch(fetchMoveActivitiesIntoCategory({ activityIds: [this.activity.Id], fromCategoryId: this.activityCategory?.Id, toCategoryId: data.toCategoryId }));
    }
  }

  async onChangeIcon() {
    const modal= await this.modalController.create({ component: ActivityIconListPage });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.icon) {
      this.store.dispatch(fetchUpdateActivity({ activityId: this.activityId, fields: { icon: data.icon }, activityCategoryId: this.activityCategory?.Id }));
    }
  }

  onRemove() {
    this.store.dispatch(removeActivitiesConfirmation({ activityIds: [this.activityId], activityCategoryId: this.activityCategory?.Id }));
  }
}
