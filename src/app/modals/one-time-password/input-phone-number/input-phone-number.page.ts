import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { showAlert } from 'src/app/store/actions/application.actions';

@Component({
  selector: 'app-input-phone-number',
  templateUrl: './input-phone-number.page.html',
  styleUrls: ['./input-phone-number.page.scss'],
})
export class InputPhoneNumberPage implements OnInit {
  public phone: string;

  constructor(private store: Store, private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  onSubmitPhone() {
    if (!this.phone || this.phone === '') {
      this.store.dispatch(showAlert({
        options: {
          message: 'Nomor HP tidak boleh kosong!',
          buttons: ['OK']
        }
      }));
    } else {
      this.modalController.dismiss({ phone: `+62${this.phone.toString()}` });
    }
  }
}
