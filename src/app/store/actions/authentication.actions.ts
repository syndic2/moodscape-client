import { createAction, props } from '@ngrx/store';

//Fetch API
export const fetchLogin= createAction(
  '[Auth/API] Login',
  props<{ emailOrUsername: string, password: string }>()
);

export const fetchLogout= createAction('[Auth/API] Logout');

//STORE
export const login= createAction('[Auth/STORE] Login')

export const logout= createAction('[Auth/STORE] Logout');