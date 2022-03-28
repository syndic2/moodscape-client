import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
    dateOfBirth: [
      { type: 'required', message: 'Tanggal lahir tidak boleh kosong.' }
    ],
    email: [
      { type: 'required', message: 'Alamat surel tidak boleh kosong.' },
      { type: 'pattern', message: 'Alamat surel tidak valid.' }
    ]
  };
  public user: User;
  private userSubscription: Subscription;

  constructor(private store: Store, private formBuilder: FormBuilder, private authenticattionService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.userSubscription = this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticattionService.isLoggedIn))
      .subscribe(res => {
        if (res === null) {
          this.store.dispatch(fetchProfile({ skipLoading: false }));
        } else {
          this.user = { ...res };
          this.updateProfileForm.patchValue({ ...res });
          this.updateProfileForm.updateValueAndValidity();
          delete this.user['__typename'];
        }
      });
  }

  ionViewWillLeave() {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchProfile({ skipLoading: false }));
    event.target.complete();
  }

  initializeForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl(
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ),
      imgUrl: new FormControl(''),
    });
  }

  onSubmit() {
    this.store.dispatch(validateUpdateProfile({
      fields: { ...this.updateProfileForm.value, email: this.updateProfileForm.controls.email.value },
      isInvalid: this.updateProfileForm.invalid
    }))
  }
}
