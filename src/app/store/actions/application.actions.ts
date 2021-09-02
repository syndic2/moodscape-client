import { createAction, props } from '@ngrx/store';

<<<<<<< HEAD
import { ToastOptions, AlertOptions, ModalOptions, PopoverOptions } from '@ionic/angular';
=======
import {  ToastOptions, AlertOptions, ModalOptions, PopoverOptions } from '@ionic/angular';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

/**
 * showModal and showPopvoer not working, because due to the Ionic attach component policy
 */

<<<<<<< HEAD
export const setIsResetForm= createAction(
  '[App UI/FORM] Set is reset form',
  props<{ isReset: boolean }>()
);

=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
export const showToast= createAction(
  '[App UI/TOAST] Show toast from Ionic',
  props<{ options: ToastOptions }>()
);

export const showAlert= createAction(
  '[App UI/ALERT] Show alert from Ionic',
  props<{ options: AlertOptions }>()
);

export const showModal= createAction(
  '[App UI/MODAL] Show modal from Ionic',
  props<{ options: ModalOptions }>()
);

export const showPopover= createAction(
  '[App UI/POPOVER] Show popover from Ionic',
  props<{ options: PopoverOptions }>()
);