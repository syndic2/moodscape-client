import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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

  async onSubmit(data) {
    this.authService.login(data).subscribe(async res => {
      let loading= await this.loadingController.create({
        spinner: 'crescent',
        translucent: true,
      });

      await loading.present();

      if (!res) {
        await loading.dismiss();

        const alert= await this.alertController.create({
          header: 'Gagal masuk!',
          message: 'Nama pengguna/surel atau kata sandi anda salah.',
          buttons: ['OK']
        });

        alert.present();
      } else {
        await loading.dismiss();
        this.router.navigate(['/side-menu']);
      }
    });
  }

  async onGoogleSignIn() {
    const data= await Plugins.GoogleAuth.signIn();
    let loading= await this.loadingController.create({
      spinner: 'crescent',
      translucent: true,
    });

    loading.present();

    this.authService.login({
      name: data.name,
      email: data.email,
      password: 'google',
      img_url: data.imageUrl
    }, 'google').subscribe(async res => {
      if (!res) {
        loading.dismiss();

        const alert= await this.alertController.create({
          header: 'Gagal masuk dengan Google!',
          message: 'Terjadi kesalahan terhadap surel anda, silahkan coba kembali.',
          buttons: ['OK']
        });

        alert.present();
      } else {
        await loading.dismiss();
        this.router.navigate(['/side-menu']);
      }
    });
  }
}
