import { Injectable } from '@angular/core';

import { ToastController, AlertController, ModalController, PopoverController } from '@ionic/angular';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { showRequestErrorModal, showToast, showAlert, showModal, showPopover } from '../actions/application.actions';
import { ModalService } from 'src/app/services/modal/modal.service';

@Injectable()
export class ApplicationEffects {  
  /**
   * Ionic
   */
  showToast$= createEffect(() => this.actions$.pipe(
    ofType(showToast),
    tap(async ({ options }) => {
      const toast= await this.toastController.create(options);
      return toast.present();
    })
  ), { dispatch: false });

  showAlert$= createEffect(() => this.actions$.pipe(
    ofType(showAlert),
    tap(async ({ options }) => {
      const alert= await this.alertController.create(options);
      return alert.present();
    })
  ), { dispatch: false });

  showModal$= createEffect(() => this.actions$.pipe(
    ofType(showModal),
    tap(async ({ options }) => {
      const modal= await this.modalController.create(options);
      return modal.present();
    })
  ), { dispatch: false });

  showPopover$= createEffect(() => this.actions$.pipe(
    ofType(showPopover),
    tap(async ({ options }) => {
      const popover= await this.popoverController.create(options);
      return popover.present();
    })
  ), { dispatch: false });
  
  /**
   * Application
   */
    showRequestErrorModal$= createEffect(() => this.actions$.pipe(
    ofType(showRequestErrorModal),
    tap(({ message }) => this.modalService.requestError(message))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private modalService: ModalService
  ) {}
};
