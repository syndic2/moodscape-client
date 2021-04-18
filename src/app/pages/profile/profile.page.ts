import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public updateProfileForm: FormGroup;
  public errorMessages= {
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

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    /*setInterval(() => {
      if (this.authService.finishRefreshToken.getValue()) {
        this.authService.finishRefreshToken.next(false);
        this.pullRefresh();
      }
    }, 2000);*/
  }

  ionViewWillEnter() {
    this.userService.getProfile().subscribe(res => {
      this.user= Object.assign({}, res[1]);

      delete res[1]['__typename'];
      delete res[1]['imgUrl'];
      
      this.updateProfileForm.setValue(res[1]);
    });
  }

  pullRefresh(event?: any) {
    this.userService.getProfile().subscribe(res => {
      this.user= Object.assign({}, res[1]);

      delete res[1]['__typename'];
      delete res[1]['imgUrl'];
      
      this.updateProfileForm.setValue(res[1]);
      event && event.target.complete();
    });
  }

  get firstName() {
    return this.updateProfileForm.get('firstName');
  }

  get lastName() {
    return this.updateProfileForm.get('lastName');
  }

  get gender() {
    return this.updateProfileForm.get('gender');
  }

  get age() {
    return this.updateProfileForm.get('age');
  }

  get email() {
    return this.updateProfileForm.get('email');
  }

  private initializeForm() {
    this.updateProfileForm= this.formBuilder.group({
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
      ]
    });
  }

  async onUpdate() {
    if (this.updateProfileForm.invalid) {
      const alert= await this.alertController.create({
        message: 'Informasi pengguna tidak boleh ada yang kosong!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.userService.updateUser(this.updateProfileForm.value).subscribe(async res => {
        const toast= await this.toastController.create({
          message: res.response.text,
          position: 'top',
          duration: 2000
        });
        toast.present();
      });
    }
  }
}
