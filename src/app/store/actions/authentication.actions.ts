import { createAction, props } from '@ngrx/store';
<<<<<<< HEAD
import { User } from 'src/app/models/user.model';

//Fetch API
export const requestLogin= createAction(
  '[Auth/API] Request auth login',
  props<{ credentials: {}, withGoogle?: boolean, isInvalid?: boolean}>()
);

export const fetchLogin= createAction(
  '[Auth/API] Authenticate login credentials',
  props<{ credentials: {}, withGoogle?: boolean }>()
);

export const requestResetPassword= createAction(
  '[Auth/API] Request reset password',
  props<{ email: string }>()
);

export const fetchResetPassword= createAction(
  '[Auth/API] Reset password',
  props<{ resetToken: string, newPassword: string }>()
);

export const fetchLogout= createAction('[Auth/API] Auth logout');

//STORE
export const setAuth= createAction(
  '[Auth/STORE] Set auth login',
  props<{ user: User }>()
);

export const updateAuth= createAction(
  '[Auth/STORE] Update auth',
  props<{ fields: {} }>()
);

/**
 * logout on logoutMetaReducer
 */
export const logout= createAction('[Auth/STORE] Auth logout');
=======

//Fetch API
export const fetchLogin= createAction(
  '[Auth/API] Login',
  props<{ emailOrUsername: string, password: string }>()
);

export const fetchLogout= createAction('[Auth/API] Logout');

//STORE
export const login= createAction('[Auth/STORE] Login')

export const logout= createAction('[Auth/STORE] Logout');
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
