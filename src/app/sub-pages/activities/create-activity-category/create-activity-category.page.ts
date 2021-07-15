import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { createActivityCategory } from 'src/app/store/actions/user-activities.actions';

import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';
import { ActivityListPage } from 'src/app/modals/activities/activity-list/activity-list.page';

@Component({
  selector: 'app-create-activity-category',
  templateUrl: './create-activity-category.page.html',
  styleUrls: ['./create-activity-category.page.scss'],
})
export class CreateActivityCategoryPage implements OnInit {
  private fields;

  constructor(
    private store: Store,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private userActivitiesService: UserActivitiesService
  ) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.fields= { Id: 999, ...form.value, activities: [] };

    const alert= await this.alertController.create({
      message: 'Apakah anda ingin memindahkan aktivitas ke dalam kategori ini?',
      buttons: [
        {
          text: 'Ya, pindahkan',
          handler: async () => {
            const modal= await this.modalController.create({
              component: ActivityListPage,
              componentProps: {
                activityCategory:  { ...this.fields }
              }
            });

            modal.present();
          }
        },
        {
          text: 'Tidak',
          handler: () => {
            this.store.dispatch(createActivityCategory({ activityCategory: this.fields }));
            this.router.navigate(['settings/activities']);
          }
        }
      ]
    });

    alert.present();
  }
}
