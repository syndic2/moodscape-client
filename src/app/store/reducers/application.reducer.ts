import { createReducer, on } from '@ngrx/store';

import { ApplicationState } from '../states';
import { setIsResetForm } from '../actions/application.actions';

const initialState: ApplicationState = {
  isResetForm: false
};

export const applicationReducer = createReducer(
  initialState,

  on(setIsResetForm, (state, { isReset }) => ({ ...state, isResetForm: isReset }))
);
