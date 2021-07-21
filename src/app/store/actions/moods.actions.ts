import { createAction, props } from '@ngrx/store';

export const setUserMoods= createAction(
  '[MOODS] Set User Moods',
  props<{ userMoods }>()
);

export const createMood= createAction(
  '[MOODS] Create New Mood',
  props<{ mood }>()
);

export const updateMood= createAction(
  '[MOODS] Update Mood',
  props<{ moodId: number, fields: {} }>()
);

export const removeMoods= createAction(
  '[MOODS] Remove Moods',
  props<{ moodIds: number[] }>()
);

