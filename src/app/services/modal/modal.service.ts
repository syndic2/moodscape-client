import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalController: ModalController) { }

  async open(options: ModalOptions): Promise<{ data: any } | null> {
    const modal = await this.modalController.create(options);
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return { data: data };

    return { data: null };
  }

  async internetConnectionError(message: string) {
    const { InternetConnectionErrorPageModule } = await import('../../modals/errors/internet-connection-error/internet-connection-error.module');
    const modal = await this.modalController.create({
      component: InternetConnectionErrorPageModule.getComponent(),
      componentProps: {
        message: message
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    modal.present();
  }

  async requestError(message: string) {
    const { RequestErrorPageModule } = await import('../../modals/errors/request-error/request-error.module');
    const modal = await this.modalController.create({
      component: RequestErrorPageModule.getComponent(),
      componentProps: {
        message: message
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    modal.present();
  }
}
