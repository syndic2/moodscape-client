import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { HabitState } from '../states';

const selectHabitFeature= createFeatureSelector<HabitState>(StoreFeatureKeys.HABIT);

export const getHabits= (day: string= '') => {
  return createSelector(
    selectHabitFeature,
    state => {
      if (day !== '')
        return state.habits.filter(habit => habit.day === day)

      return state.habits
    }
  );
};  

export const getHabit= (habitId: number) => {
  return createSelector(
    getHabits(),
    state => state.find(object => object.Id === habitId)
  )
};