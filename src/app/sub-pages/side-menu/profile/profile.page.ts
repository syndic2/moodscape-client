import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { fetchProfile, validateUpdateProfile } from 'src/app/store/actions/user.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
	public updateProfileForm: FormGroup;
	public errorMessages = {
		firstName: [
			{ type: 'required', message: 'Nama depan tidak boleh kosong.' }
		],
		lastName: [
			{ type: 'required', message: 'Nama belakang tidak boleh kosong.' }
		],
		gender: [
			{ type: 'required', message: 'Jenis kelamin tidak boleh kosong.' }
		],
		age: [
			{ type: 'required', message: 'Umur tidak boleh kosong.' }
		],
		email: [
			{ type: 'required', message: 'Alamat surel tidak boleh kosong.' },
			{ type: 'pattern', message: 'Alamat surel tidak valid.' }
		]
	};
	public user: User;
	private userSubscription: Subscription;

	constructor(private store: Store, private formBuilder: FormBuilder) { }

	ngOnInit() {
    this.initializeForm();
	}

	ionViewWillEnter() {
		this.userSubscription= this.store.select(getAuthenticated).subscribe(res => {
			if (res === null) {
        this.store.dispatch(fetchProfile());
			} else {
        this.user= { ...res };

				delete this.user['__typename'];
				
				this.updateProfileForm.setValue(this.user);
      }
		});
	}

  ionViewWillLeave() {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

	pullRefresh(event) {
		this.store.dispatch(fetchProfile());
		event.target.complete();
	}

	initializeForm() {
		this.updateProfileForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			gender: ['', Validators.required],
			age: ['', Validators.required],
			email: [
				'',
				[
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				]
			],
			imgUrl: [''],
		});
	}

	onSubmit() {
		this.store.dispatch(validateUpdateProfile({ fields: this.updateProfileForm.value, isInvalid: this.updateProfileForm.invalid }))
	}
}
