import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Mood } from 'src/app/models/mood.model';

import { StoreFeatureKeys  } from '../feature-keys';

export const selectUserMoodsFeature= createFeatureSelector<Mood[]>(StoreFeatureKeys.UserMoods);

export const selectMoods= createSelector(
  selectUserMoodsFeature,
  state => state
);

export const selectMood= (props) => {
  return createSelector(
    selectMoods,
    state => state.find(object => object.Id === props.Id)
  )
};
