import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ApplicationState } from '../states';

const selectApplicationFeature = createFeatureSelector<ApplicationState>(StoreFeatureKeys.APPLICATION);

export const getIsResetForm = createSelector(
  selectApplicationFeature,
  state => state.isResetForm
);
