import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user/user.service';
import { MatchValidator } from 'src/app/validators/match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public changePasswordForm: FormGroup;
  public errorMessages= {
    oldPassword: [
      { type: 'required', message: 'Kata sandi lama tidak boleh kosong.' }
    ],
    newPassword: [
      { type: 'required', message: 'Kata sandi baru tidak boleh kosong.' }
    ],
    confirmNewPassword: [
      { type: 'required', message: 'Konfirmasi kata sandi baru tidak boleh kosong.' }
    ]
	};
  private changePasswordListener: Subscription;

  constructor(
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private toastController: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.changePasswordForm= this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: MatchValidator('newPassword', 'confirmNewPassword')
    });
  }

  ionViewWillLeave() {
    this.changePasswordListener && this.changePasswordListener.unsubscribe();
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.changePasswordForm.invalid) {
      alert.message= 'Kolom input ada yang kosong atau inputan tidak valid!';
      alert.present();
    } else {
      this.changePasswordListener= this.userService.changePassword(this.oldPassword.value, this.newPassword.value).subscribe(async res => {
        if (!res.response.status) {
          const toast= await this.toastController.create({
            message: res.response.text,
						position: 'top',
						duration: 2000
          });
          toast.present();
        } else {
          alert.message= res.response.text;
          alert.present();
          this.changePasswordForm.reset();
        }
      });
    }
  }
}
