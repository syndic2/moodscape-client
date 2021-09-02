import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { HabitState } from '../states';

<<<<<<< HEAD
const selectHabitFeature= createFeatureSelector<HabitState>(StoreFeatureKeys.HABIT);
=======
export const selectHabitFeature= createFeatureSelector<HabitState>(StoreFeatureKeys.HABIT);
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

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