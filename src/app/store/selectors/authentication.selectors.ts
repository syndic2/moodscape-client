import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { AuthenticationState } from '../states';

const selectAuthenticationFeature = createFeatureSelector<AuthenticationState>(StoreFeatureKeys.AUTHENTIACTION);

export const getAuthenticated = createSelector(
  selectAuthenticationFeature,
  state => state.authUser
);
