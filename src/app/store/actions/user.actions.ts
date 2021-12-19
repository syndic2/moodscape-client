import { createAction, props } from '@ngrx/store';

//Fetch API
export const fetchProfile = createAction('[User/API] Get user profile');

export const validateCreateUser = createAction(
  '[User/API] Validate create new user',
  props<{ fields: {}, isInvalid: boolean }>()
);

export const fetchCreateUser = createAction(
  '[User/API] Register new user',
  props<{ fields: {} }>()
);

export const validateUpdateProfile = createAction(
  '[User/API] Validate update profile',
  props<{ fields: {}, isInvalid: boolean }>()
);

export const fetchUpdateProfile = createAction(
  '[User/API] Update user profile',
  props<{ fields: {} }>()
);

export const validateChangePassword = createAction(
  '[User/API] Validate change password',
  props<{ oldPassword: string, newPassword: string, isInvalid: boolean }>()
);

export const fetchChangePassword = createAction(
  '[User/API] Change password',
  props<{ oldPassword: string, newPassword: string }>()
);


