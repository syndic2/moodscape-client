import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { selectActivity } from 'src/app/store/selectors/user-activities.selectors';
import { moveActivitiesIntoCategory, updateActivity, removeActivities } from 'src/app/store/actions/user-activities.actions';

import { Activity } from 'src/app/models/activities/activity.model';
import { ActivityCategory } from 'src/app/models/activities/activity-category.model';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
import { ActivityEditNamePage } from 'src/app/modals/activities/activity-edit-name/activity-edit-name.page';
import { ActivityCategoryListPage } from 'src/app/modals/activities/activity-category-list/activity-category-list.page';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  private activity: Activity;
  public activityCategory: ActivityCategory;
  private getActivityListener: Subscription= null;
  private getActivityCategoryListener: Subscription= null;
  private activityId: number;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private modalController: ModalController,
    private userActivitiesService: UserActivitiesService
  ) { }

  ngOnInit() {
    this.activityId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getActivityCategoryListener= this.store.select(selectActivity({ Id: this.activityId })).subscribe(res => {
      this.activity= res;
      this.activityCategory= res.activityCategory;
    });
  }

  ionViewWillLeave() {
    this.getActivityListener && this.getActivityListener.unsubscribe();
    this.getActivityCategoryListener && this.getActivityCategoryListener.unsubscribe();
  }

  async onUpdateName() {
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

  async onMoveToAnotherCatgory() {
    const modal= await this.modalController.create({
      component: ActivityCategoryListPage,
      componentProps: { currentActivityCategory: this.activityCategory }
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

  async onRemove() {
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
              activityIds: [this.activityId],
              ...this.activityCategory && { activityCategoryId: this.activityCategory.Id }
            }));
            this.router.navigate(
              this.activityCategory ?
                ['/settings/activities/activity-category', this.activityCategory.Id]
              :
                ['/settings/activities/keeped']
            );
          }
        }
      ]
    });
    
    alert.present();
  }
}
