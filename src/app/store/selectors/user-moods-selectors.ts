import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys  } from '../feature-keys';
import { UserMoodsState } from '../states';

export const selectUserMoodsFeature= createFeatureSelector<UserMoodsState>(StoreFeatureKeys.UserMoods);

export const selectMoods= createSelector(
  selectUserMoodsFeature,
  state => state.moods
);

export const selectMood= (props) => {
  return createSelector(
    selectMoods,
    state => state.find(object => object.Id === props.Id)
  );
};
