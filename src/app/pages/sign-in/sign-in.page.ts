import { Component, OnInit } from '@angular/core';
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
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      header: 'Gagal masuk!',
      buttons: ['OK']
    });

    this.authService.login(form.value).subscribe(async res => {
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
    const data= await Plugins.GoogleAuth.signIn();
    const loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });
    const alert= await this.alertController.create({
      header: 'Gagal masuk dengan Google!',
      message: 'Terjadi kesalahan terhadap surel anda, silahkan coba kembali.',
      buttons: ['OK']
    });

    loading.present();

    this.authService.login({
      name: data.name,
      email: data.email,
      password: 'google',
      img_url: data.imageUrl
    }, true).subscribe(async res => {
      if (!res) {
        loading.dismiss();
        alert.present();
      } else {
        loading.dismiss();
        this.router.navigate(['/side-menu']);
      }
    });
  }
}
