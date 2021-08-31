import { createAction, props } from '@ngrx/store';

import { ActivityIcon, Activity, ActivityCategory } from 'src/app/models/activity.model';

/**
 * Activity
 */
//Fetch API
export const fetchActivityIcons= createAction(
  '[Activity Icon/API] Get activity icons',
  props<{ name?: string }>()
);

export const fetchActivity= createAction(
  '[Activity/API] Get activity',
  props<{ activityId: number, activityCategoryId?: number }>()
);

export const fetchCreateActivity= createAction(
  '[Activity/API] Create new activity',
  props<{ fields, activityCategoryId?: number }>()
);

export const fetchUpdateActivity= createAction(
  '[Activity/API] Update activity',
  props<{ activityId: number, fields: {}, activityCategoryId?: number }>()
);

export const removeActivitiesConfirmation= createAction(
  '[Activity/API] Remove activities confirmation',
  props<{ activityIds: number[], activityCategoryId?: number }>()
);

export const fetchRemoveActivities= createAction(
  '[Activity/API] Remove activities',
  props<{ activityIds: number[], activityCategoryId?: number }>()
);

export const fetchMoveActivitiesIntoCategory= createAction(
  '[Activity/API] Move activities into category',
  props<{ activityIds, fromCategoryId?: number, toCategoryId: number }>()
);

//STORE
export const setActivityIcons= createAction(
  '[Activity Icon/STORE] Set activity icons',
  props<{ activityIcons: ActivityIcon[] }>()
);

export const setActivity= createAction(
  '[Activity/STORE] Set activity',
  props<{ activity: Activity, activityCategoryId?: number }>()
);

export const createActivity= createAction(
  '[Activity/STORE] Create new activity',
  props<{ activity, activityCategoryId?: number }>()
);

export const updateActivity= createAction(
  '[Activity/STORE] Update activity',
  props<{ activityId: number, fields: {}, activityCategoryId?: number }>()
);

export const removeActivities= createAction(
  '[Activity/STORE] Remove activities',
  props<{ activityIds: number[], activityCategoryId?: number }>()
);

export const moveActivitiesIntoCategory= createAction(
  '[Activity/STORE] Move activities into category',
  props<{ activities, fromCategoryId?: number, toCategoryId: number }>()
);

/**
 * Activity Category
 */
//Fetch API
export const fetchActivityCategories= createAction('[Activity/API] Get activity categories');

export const fetchActivitiesNoneCategory= createAction(
  '[Activity/API] Get activity none category',
  props<{ fields: {} }>()
);

export const fetchActivityCategory= createAction(
  '[Activity/API] Get activity category',
  props<{ activityCategoryId: number }>()
);

export const fetchCreateActivityCategory= createAction(
  '[Activity/API] Create new activity category',
  props<{ fields: {} }>()
)

export const fetchUpdateActivityCategory= createAction(
  '[Activity/API] Update activity category',
  props<{ activityCategoryId: number , fields: {} }>()
);

export const removeActivityCategoriesConfirmation= createAction(
  '[Activity/API] Remove activity categories confirmation',
  props<{ activityCategory: ActivityCategory }>()
);

export const fetchRemoveActivityCategories= createAction(
  '[Activity/API] Remove activity categories',
  props<{ activityCategoryIds: number[], keepActivities?: boolean }>() 
);

export const fetchReOrderActivityCategory= createAction('[Activity/API] Post reordered indexes of activity category');

//STORE
export const setActivityCategories= createAction(
  '[Activity/STORE] Set activity categories',
  props<{ activityCategories: ActivityCategory[] }>()
);

export const setActivitiesNonetCategory= createAction(
  '[Activity/STORE] Set activity without category',
  props<{ activities: Activity[] }>()
);

export const setActivityCategory= createAction(
  '[Activity/STORE] Set activity category',
  props<{ activityCategory: ActivityCategory }>()
);

export const createActivityCategory= createAction(
  '[Activity/STORE] Create new activity Category',
  props<{ activityCategory }>()
);

export const updateActivityCategory= createAction(
  '[Activity/STORE] Update activity category',
  props<{ activityCategoryId: number, fields: {} }>()
);

export const removeActivityCategories= createAction(
  '[Activity/STORE] Remove activity categories',
  props<{ activityCategoryIds: number[], keepActivities?: boolean }>()
);

export const reorderActivityCategory= createAction(
  '[Activity/STORE] Reorder activity category',
  props<{ from: number, to: number }>()
);


