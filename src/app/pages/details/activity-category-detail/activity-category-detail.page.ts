import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { updateActivityCategory, removeActivityCategories } from 'src/app/store/actions/activities.actions';
import { selectActivityCategory } from 'src/app/store/selectors/activities.selectors';

import { ActivityCategory } from 'src/app/models/activity.model';
import { ActivityCategoryEditNamePage } from 'src/app/modals/activities/activity-category-edit-name/activity-category-edit-name.page';

@Component({
  selector: 'app-activity-category-detail',
  templateUrl: './activity-category-detail.page.html',
  styleUrls: ['./activity-category-detail.page.scss'],
})
export class ActivityCategoryDetailPage implements OnInit {
  public activityCategory: ActivityCategory;
  private activityCategoryId: number;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.activityCategoryId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.store.select(selectActivityCategory({ Id: this.activityCategoryId })).subscribe(res => {
      this.activityCategory= res;
    });
  }

  async onUpdate() {
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
              this.router.navigate(['/settings/activities']);
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
              this.router.navigate(['/settings/activities']);
            }
          },
          {
            text: 'Hapus semua aktivitas',
            handler: () => {
              this.store.dispatch(removeActivityCategories({ activityCategoryIds: [this.activityCategory.Id] }));
              this.router.navigate(['/settings/activities']);
            }
          }
        ]
      });
      reConfirmAlert.present();
    }
  }
}
