import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public signInForm: FormGroup;
  public errorMessages= {
    emailOrUsername: [
      { type: 'required', message: 'Alamat surel atau nama pengguna tidak boleh kosong.' }
    ],
    password: [
      { type: 'required', message: 'Kata sandi tidak boleh kosong.' }
    ]
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.signInForm.reset();
  }

  get emailOrUsername() {
    return this.signInForm.get('emailOrUsername');
  }

  get password() {
    return this.signInForm.get('password');
  }

  private initializeForm() {
    this.signInForm= this.formBuilder.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    const alert= await this.alertController.create({
      header: 'Gagal masuk!',
      buttons: ['OK']
    });

    this.authService.login(this.signInForm.value).subscribe(res => {
      if (!res.status) {
        alert.message= res.text;
        alert.present();
      } else {
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
    const alert= await this.alertController.create({
      header: 'Gagal masuk dengan akun Google!',
      buttons: ['OK']
    });

    this.authService.login(data, true).subscribe(async res => {
      if (!res.status) {
        alert.message= res.text;
        alert.present();
      } else {
        this.router.navigate(['/side-menu']);
      }
    });
  }
}
