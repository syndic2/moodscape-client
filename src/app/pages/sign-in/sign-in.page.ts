import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

import { requestLogin } from 'src/app/store/actions/authentication.actions';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.page.html',
	styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
	public signInForm: FormGroup;
	public errorMessages = {
		emailOrUsername: [
			{ type: 'required', message: 'Alamat surel atau nama pengguna tidak boleh kosong.' }
		],
		password: [
			{ type: 'required', message: 'Kata sandi tidak boleh kosong.' }
		]
	};

	constructor(private store: Store, private formBuilder: FormBuilder) {
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
		this.signInForm = this.formBuilder.group({
			emailOrUsername: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		this.store.dispatch(requestLogin({ credentials: this.signInForm.value, isInvalid: this.signInForm.invalid }));
	}

	async onGoogleSignIn() {
		const accountInfo = await Plugins.GoogleAuth.signIn();
		const data = {
			firstName: accountInfo.givenName,
			lastName: accountInfo.familyName,
			email: accountInfo.email,
			password: 'google-account',
			imgUrl: accountInfo.imageUrl
		};

		this.store.dispatch(requestLogin({ credentials: data, withGoogle: true }));
	}
}
