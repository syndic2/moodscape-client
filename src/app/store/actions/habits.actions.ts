import { createAction, props } from '@ngrx/store';

export const setUserHabits= createAction(
  '[HABITS] Set User Habits',
  props<{ userHabits }>()
);

export const markGoalHabit= createAction(
  '[HABITS] Mark Goal Habit',
  props<{ habitId: number }>()
);

export const createHabit= createAction(
  '[HABITS] Create New Habit',
  props<{ habit }>()
);

export const updateHabit= createAction(
  '[HABITS] Update Habit',
  props<{ habitId: number, fields: {} }>()
);

export const removeHabits= createAction(
  '[HABITS] Remove Habits',
  props<{ habitIds: number[] }>()
);