import { Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { InternetConnectionErrorPage } from 'src/app/modals/errors/internet-connection-error/internet-connection-error.page';
import { RequestErrorPage } from 'src/app/modals/errors/request-error/request-error.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController) { }

  async internetConnectionError(message: string) {
    const isModalOpened = await this.modalController.getTop();

    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: InternetConnectionErrorPage,
        componentProps: {
          message: message
        },
        cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
      });
      modal.present();
    }
  }

  async requestError(message: string) {
    const isModalOpened = await this.modalController.getTop();

    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: RequestErrorPage,
        componentProps: {
          message: message
        },
        cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
      });
      modal.present();
    }
  }
}
