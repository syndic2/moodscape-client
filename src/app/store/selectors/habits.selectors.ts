import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { HabitsState } from '../states';

export const selectHabitFeature= createFeatureSelector<HabitsState>(StoreFeatureKeys.HabitsState);

export const selectHabits= createSelector(
  selectHabitFeature,
  state => state.habits
);  

export const selectHabit= (props) => {
  return createSelector(
    selectHabits,
    state => state.find(object => object.Id === props.Id)
  )
};