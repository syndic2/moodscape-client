import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user: User;
  private profileSubscription: Subscription;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.profileSubscription= this.userService.getProfile().subscribe(res => this.user= res);
  }

  ionViewWillLeave() {
    this.profileSubscription.unsubscribe();
  }

  async onUpdate(form: NgForm) {
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      buttons: ['OK']
    });

    this.userService.updateUser(form.value).subscribe(async res => {
      loading.present();

      alert.message= res.response.text;

      if (!res.response.status) alert.header= 'Gagal merubah profil!';
      else alert.header= 'Berhasil merubah profil!';

      loading.dismiss();
      alert.present();
    });
  }
}
