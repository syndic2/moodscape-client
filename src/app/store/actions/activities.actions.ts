import { createAction, props } from '@ngrx/store';

export const setUserActivities= createAction(
  '[ACTIVITIES] Set User Activities',
  props<{ activities }>()
);

export const reorderActivityCategory= createAction(
  '[ACTIVITIES] Reorder Activities',
  props<{ from: number, to: number }>()
);

export const moveActivitiesIntoCategory= createAction(
  '[ACTIVITIES] Move Activities Into Category',
  props<{ activities, fromCategoryId?: number, toCategoryId: number }>()
);

export const createActivity= createAction(
  '[ACTIVITIES] Create New Activity',
  props<{ activity, activityCategoryId?: number }>()
);

export const updateActivity= createAction(
  '[ACTIVITIES] Update Activity',
  props<{ activityId: number, fields: {}, activityCategoryId?: number }>()
);

export const removeActivities= createAction(
  '[ACTIVITIES] Remove Activities',
  props<{ activityIds: number[], activityCategoryId?: number }>()
);

export const createActivityCategory= createAction(
  '[ACTIVITIES] Create New Activity Category',
  props<{ activityCategory }>()
);

export const updateActivityCategory= createAction(
  '[ACTIVITIES] Update Activity Category',
  props<{ activityCategoryId: number, fields: {} }>()
);

export const removeActivityCategories= createAction(
  '[ACTIVITIES] Remove Activity Categories',
  props<{ activityCategoryIds: number[], keepActivities?: boolean }>()
);


