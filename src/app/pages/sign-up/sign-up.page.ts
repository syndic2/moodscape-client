import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MatchValidator } from 'src/app/validators/match.validator';
import { validateCreateUser } from 'src/app/store/actions/user.actions';
import { getIsResetForm } from 'src/app/store/selectors/application.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
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
    ],
    username: [
      { type: 'required', message: 'Nama pengguna tidak boleh kosong.' }
    ],
    password: [
      { type: 'required', message: 'Kata sandi tidak boleh kosong.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Konfirmasi kata sandi tidak boleh kosong.' }
    ]
  };
  private isResetFormSubscription: Subscription;

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.isResetFormSubscription = this.store.select(getIsResetForm).subscribe(res => {
      if (res) {
        this.signUpForm.reset();
      }
    });
  }

  ionViewWillLeave() {
    this.isResetFormSubscription && this.isResetFormSubscription.unsubscribe();
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  initializeForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]
      ],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MatchValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.store.dispatch(validateCreateUser({ fields: this.signUpForm.value, isInvalid: this.signUpForm.invalid }));
  }
}
