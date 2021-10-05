import { createAction, props } from '@ngrx/store';

import { Mood, MoodFilter, MoodsAverageGroupByMonth } from 'src/app/models/mood.model';

//Fetch API
export const fetchMoods= createAction('[Mood/API] Get moods');

export const fetchMood= createAction(
  '[Mood/API] Get mood',
  props<{ moodId: number }>()
);

export const fetchMoodsChart= createAction('[Mood/API] Get moods chart');

export const fetchSearchMood= createAction(
  '[Mood/API] Get mood search',
  props<{ filters: MoodFilter }>()
);

export const fetchCreateMood= createAction(
  '[Mood/API] Create new mood',
  props<{ fields: {} }>()
);

export const fetchUpdateMood= createAction(
  '[Mood/API] Update mood',
  props<{ moodId: number, fields: {} }>()
);

export const removeMoodsConfirmation= createAction(
  '[Mood/API] Remove moods confirmation',
  props<{ moodIds: number[] }>()
);

export const fetchRemoveMoods= createAction(
  '[Mood/API] Remove moods',
  props<{ moodIds: number[] }>()
);

//STORE
export const setMoods= createAction(
  '[Mood/STORE] Set moods',
  props<{ moods: Mood[] }>()
);

export const setMoodsChart= createAction(
  '[Mood/STORE] Set moods chart',
  props<{ moodsChart: MoodsAverageGroupByMonth[] }>()
);

export const setMood= createAction(
  '[Mood/STORE] Set mood',
  props<{ mood: Mood }>()
);

export const setMoodSearchResults= createAction(
  '[Mood/STORE] Set mood search results',
  props<{ moods: Mood[] }>()
);

export const createMood= createAction(
  '[Mood/STORE] Create new mood',
  props<{ mood: Mood }>()
);

export const updateMood= createAction(
  '[Mood/STORE] Update mood',
  props<{ moodId: number, fields: {} }>()
);

export const removeMoods= createAction(
  '[Mood/STORE] Remove moods',
  props<{ moodIds: number[] }>()
);

