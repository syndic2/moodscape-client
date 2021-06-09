import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { createActivity } from 'src/app/store/actions/user-activities.actions';

import { ActivityIcon } from 'src/app/models/activities/activity-icon.model';
import { ActivityIconsService } from 'src/app/services/activity-icons/activity-icons.service';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
import { ActivityCategoryListPage } from '../activity-category-list/activity-category-list.page';

@Component({
  selector: 'app-activity-icon-list',
  templateUrl: './activity-icon-list.page.html',
  styleUrls: ['./activity-icon-list.page.scss'],
})
export class ActivityIconListPage implements OnInit {
  @Input() fields;

  public activityIcons: ActivityIcon[]= [];
  private getActivityIconsListener: Subscription= null;
  private selectedIcon: string;

  constructor(
    private store: Store,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private activityIconsService: ActivityIconsService,
    private userActivitiesService: UserActivitiesService
  ) { }

  ngOnInit() {
    this.getActivityIconsListener= this.activityIconsService.getActivityIcons().subscribe(res => {
      this.activityIcons= res;
    });
  }

  ionViewWillLeave() {
    this.getActivityIconsListener && this.getActivityIconsListener.unsubscribe();
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSelectIcon(activityIcon: ActivityIcon) {
    this.selectedIcon= activityIcon.name;
  }

  async onCreate() {
    this.fields= { Id: 999, ...this.fields, ...{ icon: this.selectedIcon } };

    const alert= await this.alertController.create({
      message: 'Apakah aktivitas yang terbuat ingin langsung disimpan pada kategori?',
      buttons: [
        {
          text: 'Simpan',
          handler: async () => {
            this.modalController.dismiss();
            
            const modal= await this.modalController.create({ component: ActivityCategoryListPage });
            modal.present();

            const { data }= await modal.onWillDismiss();

            if (data) {
              this.store.dispatch(createActivity({ activity: this.fields, activityCategoryId: data.toCategoryId }));
              this.router.navigate(['/settings/activities/activity-category', data.toCategoryId]);
            }
          }
        },
        {
          text: 'Tidak',
          handler: () => {
            this.modalController.dismiss();
            this.store.dispatch(createActivity({ activity: this.fields }));
            this.router.navigate(['/settings/activities/keeped']);
          }
        }
      ]
    });

    alert.present();
  }
}
