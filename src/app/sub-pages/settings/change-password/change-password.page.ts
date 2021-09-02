import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MatchValidator } from 'src/app/validators/match.validator';
import { validateChangePassword } from 'src/app/store/actions/user.actions';
import { getIsResetForm } from 'src/app/store/selectors/application.selectors';

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
  private isResetFormSubscription: Subscription;

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changePasswordForm= this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, {
      validator: MatchValidator('newPassword', 'confirmNewPassword')
    });
  }

  ionViewWillEnter() {
    this.isResetFormSubscription= this.store.select(getIsResetForm).subscribe(res => {
      if (res) {
        this.changePasswordForm.reset();
      }
    });
  }

  ionViewWillLeave() {
    this.isResetFormSubscription && this.isResetFormSubscription.unsubscribe();
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

  onSubmit() {
    this.store.dispatch(validateChangePassword({ 
      oldPassword: this.oldPassword.value, 
      newPassword: this.newPassword.value, 
      isInvalid: this.changePasswordForm.invalid 
    }));
  }
}
