import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { ModalController } from '@ionic/angular';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ActivityCategory } from 'src/app/models/activity.model';
<<<<<<< HEAD
import {  fetchActivityCategory,  fetchUpdateActivityCategory, removeActivityCategoriesConfirmation } from 'src/app/store/actions/activity.actions';
=======
import { 
  fetchActivityCategories, 
  fetchActivityCategory, 
  fetchUpdateActivityCategory,
  removeActivityCategoriesConfirmation
} from 'src/app/store/actions/activity.actions';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { getActivityCategory } from 'src/app/store/selectors/activity.selectors';
import { ActivityCategoryEditNamePage } from 'src/app/modals/activities/activity-category-edit-name/activity-category-edit-name.page';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-activity-category-detail',
  templateUrl: './activity-category-detail.page.html',
  styleUrls: ['./activity-category-detail.page.scss'],
})
export class ActivityCategoryDetailPage implements OnInit {
  public activityCategory: ActivityCategory;
  private activityCategorySubscription: Subscription;
  private activityCategoryId: number;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.activityCategoryId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
<<<<<<< HEAD
    this.activityCategorySubscription= this.store.select(getActivityCategory({ Id: this.activityCategoryId })).subscribe(res => {
      if (res !== null) {
        this.activityCategory= res;
      }
    });
  }

  ionViewWillLeave() {
    this.activityCategorySubscription && this.activityCategorySubscription.unsubscribe();
  }

  pullRefresh(event) {
=======
    this.store.dispatch(fetchActivityCategory({ activityCategoryId: this.activityCategoryId }));
    this.activityCategorySubscription= this.store.select(getActivityCategory({ Id: this.activityCategoryId })).subscribe(res => {
      this.activityCategory= res;
    });
  }

  pullRefresh(event) {
    this.store.dispatch(fetchActivityCategories());
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    this.store.dispatch(fetchActivityCategory({ activityCategoryId: this.activityCategoryId }));
    event.target.complete();
  }

  async onUpdate() {
    const modal= await this.modalController.create({
      component: ActivityCategoryEditNamePage,
      componentProps: { categoryName: this.activityCategory.category },
      cssClass: 'activity-edit-name-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.fields) {
      this.store.dispatch(fetchUpdateActivityCategory({ activityCategoryId: this.activityCategory.Id, fields: data.fields }));
    }
  }

  onCreateActivity() {
    const extrasData: NavigationExtras= {
      state: {
        activityCategory: this.activityCategory,
        redirectTo: this.router.url
      }
    };

    this.router.navigate(['/settings/activities/create-activity'], extrasData);
  }

  async onRemove() {
    this.store.dispatch(removeActivityCategoriesConfirmation({ activityCategory: this.activityCategory }));
  }
}
