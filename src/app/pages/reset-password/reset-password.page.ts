import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { MatchValidator } from 'src/app/validators/match.validator';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;
  public errorMessages= {
    newPassword: [
      { type: 'required', message: 'Kata sandi tidak boleh kosong.' }
    ],
    confirmNewPassword: [
      { type: 'required', message: 'Konfirmasi kata sandi tidak boleh kosong.' }
    ]
	};
  private resetToken: string;
  private resetPasswordListener: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private toastController: ToastController,
		private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.resetToken= this.activatedRoute.snapshot.paramMap.get('resetToken');
    this.resetPasswordForm= this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: MatchValidator('newPassword', 'confirmNewPassword')
    });
  }

  ionViewWillLeave() {
    this.resetPasswordListener && this.resetPasswordListener.unsubscribe();
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.resetPasswordForm.get('confirmNewPassword');
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.resetPasswordForm.invalid) {
      alert.message= 'Kolom isian tidak boleh ada yang kosong!';
      alert.present();
    } else {
      this.authService.resetPassword(this.resetToken, this.newPassword.value).subscribe(async res => {
        if (!res.response.status) {
          const toast = await this.toastController.create({
						message: res.response.text,
						position: 'top',
						duration: 2000
					});
					toast.present();
        } else {
          alert.message= res.response.text;
          alert.buttons= [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/']);
              }
            }
          ];
          alert.present();
        }
      })
    }
  }
}
