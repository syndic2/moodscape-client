import { createAction, props } from '@ngrx/store';

import { ToastOptions, AlertOptions, ModalOptions, PopoverOptions } from '@ionic/angular';

/**
 * Ionic
 * showModal and showPopvoer not working, because due to the Ionic attach component policy
 */

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

/**
 * Application
 */
 export const setIsResetForm= createAction(
  '[App UI/FORM] Set is reset form',
  props<{ isReset: boolean }>()
);

export const showRequestErrorModal= createAction(
  '[App UI/MODAL] Show request error modal', 
  props<{ message: string }>()
);