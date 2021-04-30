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
	public resetPasswordForm: FormGroup;
	public errorMessages= {
		email: [
			{ type: 'required', message: 'Alamat surel tidak boleh kosong.' },
      		{ type: 'pattern', message: 'Alamat surel tidak valid.' }
		],
	};
	private resetPasswordListener: Subscription;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private alertController: AlertController,
		private toastController: ToastController,
		private authService: AuthenticationService
	) {
		this.resetPasswordForm= this.formBuilder.group({
			email: [
				'',
				[
				  Validators.required,
				  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				]
			]
		});
	}

	ngOnInit() {
	}

	ionViewWillLeave() {
		this.resetPasswordListener && this.resetPasswordListener.unsubscribe();
	}

	get email() {
		return this.resetPasswordForm.get('email');
	}

	async onSubmit() {
		const alert = await this.alertController.create({ buttons: ['OK'] });

		if (this.resetPasswordForm.invalid) {
			alert.message= 'Alamat surel tidak boleh kosong!';
			alert.present();
		} else {
			this.authService.resetPassword(this.resetPasswordForm.get('email').value).subscribe(async res => {
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
