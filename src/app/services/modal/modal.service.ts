import { Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { RequestErrorPage } from 'src/app/modals/errors/request-error/request-error.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController) { }

  async requestError(message: string) {
    const modal= await this.modalController.create({ 
      component: RequestErrorPage,
      componentProps: {
        message: message
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content' 
    });
    modal.present();
  }
}
