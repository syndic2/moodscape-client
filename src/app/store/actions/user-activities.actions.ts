import { createAction, props } from '@ngrx/store';

export const setUserActivities= createAction(
  '[USER ACTIVITIES] Set User Activities',
  props<{ userActivities }>()
)

export const reorderUserActivities= createAction(
  '[USER ACTIVITIES] Reorder User Activities',
  props<{ from: number, to: number }>()
);

export const moveActivitiesIntoCategory= createAction(
  '[USER ACTIVITIES] Move Activities Into Category',
  props<{ activities, fromCategoryId?: number, toCategoryId: number }>()
);

export const updateActivity= createAction(
  '[USER ACTIVITIES] Update Activity',
  props<{ activityId: number, fields: {}, activityCategoryId?: number }>()
);

export const removeActivities= createAction(
  '[USER ACTIVITIES] Remove Activities',
  props<{ activityIds: number[], activityCategoryId?: number }>()
);

export const updateActivityCategory= createAction(
  '[USER ACTIVITIES] Update Activity Category',
  props<{ activityCategoryId: number, fields: {} }>()
);

export const removeActivityCategories= createAction(
  '[USER ACTIVITIES] Remove Activity Categories',
  props<{ activityCategoryIds: number[], keepActivities?: boolean }>()
);


