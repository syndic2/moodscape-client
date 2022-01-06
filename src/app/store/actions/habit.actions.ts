import { createAction, props } from '@ngrx/store';

import { Habit, HabitFilter, HabitsAverageGroupByMonth } from 'src/app/models/habit.model';

//Fetch API
export const fetchHabits = createAction('[Habit/API] Get habits');

export const fetchHabitsChart = createAction('[Habit/API] Get habits chart');

export const fetchHabit = createAction(
  '[Habit/API] Get habit',
  props<{ habitId: number }>()
);

export const fetchSearchHabit = createAction(
  '[Habit/API] Search habit',
  props<{ filters: HabitFilter }>()
);

export const fetchCreateHabit = createAction(
  '[Habit/API] Create new habit',
  props<{ fields: {} }>()
);

export const fetchUpdateHabit = createAction(
  '[Habit/API] Update habit',
  props<{ habitId: number, fields: {} }>()
);

export const removeHabitsConfirmation = createAction(
  '[Habit/API] Remove habits confirmation',
  props<{ habitIds: number[] }>()
);

export const fetchRemoveHabits = createAction(
  '[Habit/API] Remove habits',
  props<{ habitIds: number[] }>()
);

export const fetchMarkHabitGoal = createAction(
  '[Habit/API] Mark habits goal',
  props<{ habitId: number, markedAt: string }>()
);

//STORE
export const setHabits = createAction(
  '[Habit/STORE] Set habits',
  props<{ habits: Habit[] }>()
);

export const setHabitsChart = createAction(
  '[Habit/STORE] Set habits chart',
  props<{ habitsChart: HabitsAverageGroupByMonth[] }>()
);

export const setHabit = createAction(
  '[Habit/STORE] Set habit',
  props<{ habit: Habit }>()
);

export const setHabitSearchResults = createAction(
  '[Habit/STORE] Set habit search results',
  props<{ habits: Habit[] }>()
);

export const createHabit = createAction(
  '[Habit/STORE] Create new habit',
  props<{ habit: Habit }>()
);

export const updateHabit = createAction(
  '[Habit/STORE] Update habit',
  props<{ habitId: number, fields: {} }>()
);

export const removeHabits = createAction(
  '[Habit/STORE] Remove habits',
  props<{ habitIds: number[] }>()
);

export const markHabitGoal = createAction(
  '[Habit/STORE] Mark habits goal',
  props<{ habitId: number, fields: {} }>()
);
