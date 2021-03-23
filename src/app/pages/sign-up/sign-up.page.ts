import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userService: UserService
  ) { }

  ngOnInit() { }

  async onSubmit(form: NgForm) {
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      buttons: ['OK']
    });

    loading.present();

    this.userService.createUser(form.value).subscribe(async res => {
      if (!res.response.status) alert.header= 'Gagal registrasi!';
      else {
        alert.header= 'Berhasil registrasi!';
        form.resetForm();
      }

      alert.message= res.response.text;

      loading.dismiss();
      alert.present();
    });
  }
}
