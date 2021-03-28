import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  @ViewChild('formLogin', { static: true }) private form: NgForm;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.form.resetForm();
  }

  async onSubmit() {
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      header: 'Gagal masuk!',
      buttons: ['OK']
    });

    this.authService.login(this.form.value).subscribe(async res => {
      loading.present();

      if (!res.status) {
        loading.dismiss();

        alert.message= res.text;
        alert.present();
      } else {
        loading.dismiss();
        this.router.navigate(['/side-menu']);
      }
    });
  }

  async onGoogleSignIn() {
    const accountInfo= await Plugins.GoogleAuth.signIn();
    const data= {
      firstName: accountInfo.givenName,
      lastName: accountInfo.familyName,
      email: accountInfo.email,
      password: 'google-account',
      imgUrl: accountInfo.imageUrl
    };
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      header: 'Gagal masuk dengan akun Google!',
      buttons: ['OK']
    });

    loading.present();

    this.authService.login(data, true).subscribe(async res => {
      if (!res.status) {
        loading.dismiss();

        alert.message= res.text;
        alert.present();
      } else {
        loading.dismiss();
        this.router.navigate(['/side-menu']);
      }
    });
  }
}
