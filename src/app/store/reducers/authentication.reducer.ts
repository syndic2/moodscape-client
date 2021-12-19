import { createReducer, on } from '@ngrx/store';

import { AuthenticationState } from '../states';
import { setAuth, updateAuth } from '../actions/authentication.actions';

const initialState: AuthenticationState = {
  authUser: null
};

export const authenticationReducer = createReducer(
  initialState,

  on(setAuth, (state, { user }) => ({ ...state, authUser: user })),

  on(updateAuth, (state, { fields }) => ({ ...state, authUser: { ...state.authUser, ...fields } }))
);
