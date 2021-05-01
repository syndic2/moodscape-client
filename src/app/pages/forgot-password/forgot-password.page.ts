import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
	public requestResetPasswordForm: FormGroup;
	public errorMessages= {
		email: [
			{ type: 'required', message: 'Alamat surel tidak boleh kosong.' },
      { type: 'pattern', message: 'Alamat surel tidak valid.' }
		],
	};
	private requestResetPasswordListener: Subscription;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private toastController: ToastController,
		private authService: AuthenticationService
	) { }

	ngOnInit() {
    this.requestResetPasswordForm= this.formBuilder.group({
			email: [
				'',
				[
				  Validators.required,
				  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				]
			]
		});
	}

	ionViewWillLeave() {
		this.requestResetPasswordListener && this.requestResetPasswordListener.unsubscribe();
	}

	get email() {
		return this.requestResetPasswordForm.get('email');
	}

	async onSubmit() {
		const alert = await this.alertController.create({ buttons: ['OK'] });

		if (this.requestResetPasswordForm.invalid) {
			alert.message= 'Alamat surel tidak boleh kosong!';
			alert.present();
		} else {
			this.authService.requestResetPassword(this.email.value).subscribe(async res => {
				if (!res.response.status) {
					const toast = await this.toastController.create({
						message: res.response.text,
						position: 'top',
						duration: 2000
					});
					toast.present();
				} else {
					alert.message= 'Silahkan cek surel anda';
					alert.present();
				}
			});
		}
	}
}
