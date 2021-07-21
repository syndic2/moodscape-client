import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { ActivityIconListPage } from 'src/app/modals/activities/activity-icon-list/activity-icon-list.page';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {
  private fromActivityCategory;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fromActivityCategory= this.router.getCurrentNavigation().extras.state;
    }
  }

  async onSubmit(form: NgForm) {
    if (!form.value.name || form.value.name === '') {
      const alert= await this.alertController.create({
        message: 'Nama aktivitas tidak boleh kosong!',
        buttons: ['OK']
      });
      
      alert.present();
    } else {
      const modal= await this.modalController.create({
        component: ActivityIconListPage,
        componentProps: {
          fields: { ...form.value },
          ...this.fromActivityCategory && { fromActivityCategory: this.fromActivityCategory }
        }
      });
      modal.present();
    }
  }
}
