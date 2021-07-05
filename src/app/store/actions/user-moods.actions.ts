import { createAction, props } from '@ngrx/store';

export const setUserMoods= createAction(
  '[USER MOODS] Set User Moods',
  props<{ userMoods }>()
);

export const searchMood= createAction(
  '[USER MOODS] Search Mood',
  props<{ fields }>()
);

export const createMood= createAction(
  '[USER MOODS] Create New Mood',
  props<{ mood }>()
);

export const updateMood= createAction(
  '[USER MOODS] Update Mood',
  props<{ moodId: number, fields: {} }>()
);

export const removeMoods= createAction(
  '[USER MOODS] Remove Moods',
  props<{ moodIds: number[] }>()
);

