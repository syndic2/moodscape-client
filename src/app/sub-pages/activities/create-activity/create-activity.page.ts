import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { navigateGo } from 'src/app/store/actions/router.actions';
import { showAlert } from 'src/app/store/actions/application.actions';
import { fetchCreateActivity } from 'src/app/store/actions/activity.actions';
import { getActivityCategories } from 'src/app/store/selectors/activity.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivityIconListPage } from 'src/app/modals/activities/activity-icon-list/activity-icon-list.page';
import { ActivityCategoryListPage } from 'src/app/modals/activities/activity-category-list/activity-category-list.page';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {
  public activityName: string;
  private fromActivityCategory;
  private activityCategoriesLength: number;
  private getActivityCategoriesSubscription: Subscription;

  constructor(
    private store: Store, 
    private router: Router, 
    private modalController: ModalController, 
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fromActivityCategory= this.router.getCurrentNavigation().extras.state;
    }
  }

  ionViewWillEnter() {
    this.getActivityCategoriesSubscription= this.store
      .select(getActivityCategories)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      this.activityCategoriesLength= res.length;
    });
  }

  ionViewWillLeave() {
    this.getActivityCategoriesSubscription && this.getActivityCategoriesSubscription.unsubscribe();
  }

  async onSubmit() {
    if (!this.activityName || this.activityName === '' || !this.activityName.trim()) {
      this.store.dispatch(showAlert({
        options: {
          message: 'Nama aktivitas tidak boleh kosong!',
          buttons: ['OK']
        }
      }))
    } else {
      const modal= await this.modalController.create({ component: ActivityIconListPage });
      modal.present();

      const { data }= await modal.onWillDismiss();
      if (data && data.icon) {
        const icon= data.icon;
        
        if (!this.fromActivityCategory) {
          if (this.activityCategoriesLength > 0) {
            this.store.dispatch(showAlert({
              options: {
                message: 'Apakah aktivitas yang terbuat ingin langsung disimpan pada kategori?',
                buttons: [
                  {
                    text: 'Simpan',
                    handler: async () => {
                      const modal= await this.modalController.create({ component: ActivityCategoryListPage });
                      modal.present();
  
                      const { data }= await modal.onWillDismiss();
                      if (data && data.toCategoryId) {
                        const toCategoryId= data.toCategoryId;
  
                        this.store.dispatch(fetchCreateActivity({ fields: { name: this.activityName, icon: icon }, activityCategoryId: toCategoryId }));
                        this.store.dispatch(navigateGo({ path: ['/settings/activities/activity-category', data.toCategoryId] }));
                      }
                    }
                  },
                  {
                    text: 'Tidak',
                    handler: () => {
                      this.store.dispatch(fetchCreateActivity({ fields: { name: this.activityName, icon: icon } }));
                      this.store.dispatch(navigateGo({ path: ['/settings/activities/keeped'] }));
                    }
                  }
                ]
              }
            }));
          } else {
            this.store.dispatch(fetchCreateActivity({ fields: { name: this.activityName, icon: icon } }));
            this.store.dispatch(navigateGo({ path: ['/settings/activities/keeped'] }));
          }
        } else {
          this.store.dispatch(fetchCreateActivity({ fields: { name: this.activityName, icon: icon }, activityCategoryId: this.fromActivityCategory.activityCategory.Id }));
          this.store.dispatch(navigateGo({ path: ['/settings/activities/activity-category', this.fromActivityCategory.activityCategory.Id] }));
        }
      }
    }
  }
}
