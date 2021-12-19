import { Injectable, NgZone } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
//import { of } from 'rxjs';
import { map, switchMap, exhaustMap, concatMap, mergeMap, withLatestFrom } from 'rxjs/operators';

import { navigateGo } from '../actions/router.actions';
import { showAlert } from '../actions/application.actions';
import {
  /**
   * Activity
   */
  fetchActivityIcons,
  fetchActivity,
  fetchCreateActivity,
  fetchUpdateActivity,
  removeActivitiesConfirmation,
  fetchRemoveActivities,
  fetchMoveActivitiesIntoCategory,

  setActivityIcons,
  setActivity,
  createActivity,
  updateActivity,
  removeActivities,
  moveActivitiesIntoCategory,

  /**
   * Activity categories
   */
  fetchActivityCategories,
  fetchActivitiesNoneCategory,
  fetchActivityCategory,
  fetchCreateActivityCategory,
  fetchUpdateActivityCategory,
  removeActivityCategoriesConfirmation,
  fetchRemoveActivityCategories,
  fetchReOrderActivityCategory,

  setActivityCategories,
  setActivitiesNonetCategory,
  setActivityCategory,
  createActivityCategory,
  updateActivityCategory,
  removeActivityCategories
} from '../actions/activity.actions';
import { getActivityCategories, /*getReorderedActivityCategories, getActivityCategory*/ } from '../selectors/activity.selectors';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Injectable()
export class ActivityEffects {
  /**
   * Activity
   */
  getActivityIcons$ = createEffect(() => this.actions$.pipe(
    ofType(fetchActivityIcons),
    exhaustMap(() => this.activityService.getActivityIcons().pipe(
      map(res => setActivityIcons({ activityIcons: res }))
    ))
  ));

  getActivity$ = createEffect(() => this.actions$.pipe(
    ofType(fetchActivity),
    exhaustMap(({ activityId, activityCategoryId }) => this.activityService.getActivity(activityId, activityCategoryId).pipe(
      map(res => setActivity({ activity: res.activity, activityCategoryId: activityCategoryId }))
    ))
  ));

  createActivity$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCreateActivity),
    concatMap(({ fields, activityCategoryId }) => this.activityService.createActivity(fields, activityCategoryId).pipe(
      map(res => createActivity({ activity: res.createdActivity, activityCategoryId: activityCategoryId }))
    ))
  ))

  updateActivity$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateActivity),
    concatMap(({ activityId, fields, activityCategoryId }) => this.activityService.updateActivity(activityId, fields, activityCategoryId).pipe(
      map(res => updateActivity({ activityId: res.updatedActivity.Id, fields: res.updatedActivity, activityCategoryId: activityCategoryId }))
    ))
  ));

  removeActivitiesConfirmation$ = createEffect(() => this.actions$.pipe(
    ofType(removeActivitiesConfirmation),
    map(({ activityIds, activityCategoryId }) => showAlert({
      options: {
        message: 'Apakah anda yakin ingin menghapus aktivitas ini?',
        buttons: [
          {
            text: 'Tetap simpan',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: () => {
              this.store.dispatch(fetchRemoveActivities({ activityIds: activityIds, activityCategoryId: activityCategoryId }));
            }
          }
        ]
      }
    }))
  ));

  moveActivitiesIntoCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMoveActivitiesIntoCategory),
    mergeMap(({ activityIds, fromCategoryId, toCategoryId }) => this.activityService.moveActivitiesIntoCategory(activityIds, fromCategoryId, toCategoryId).pipe(
      map(res => moveActivitiesIntoCategory({ activities: res.movedActivities, fromCategoryId: fromCategoryId, toCategoryId: toCategoryId }))
    ))
  ));

  removeActivities$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveActivities),
    mergeMap(({ activityIds, activityCategoryId }) => this.activityService.removeActivities(activityIds, activityCategoryId).pipe(
      switchMap(res => [
        removeActivities({ activityIds: res.removedActivities, activityCategoryId: activityCategoryId }),
        navigateGo({
          path: activityCategoryId ?
            ['/settings/activities/activity-category', activityCategoryId]
            :
            ['/settings/activities/keeped']
        })
      ])
    ))
  ));

  /**
   * Activity Category
  */
  getActivityCategories$ = createEffect(() => this.actions$.pipe(
    ofType(fetchActivityCategories),
    exhaustMap(() => this.activityService.getActivityCategories().pipe(
      map(res => setActivityCategories({ activityCategories: res.activityCategories }))
    ))
  ));

  getActivitiesNoneCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchActivitiesNoneCategory),
    exhaustMap(({ fields }) => this.activityService.getActivityCategories(fields).pipe(
      map(res => setActivitiesNonetCategory({ activities: res.activityCategories.length ? res.activityCategories[0].activities : [] }))
    ))
  ));

  getActivityCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchActivityCategory),
    exhaustMap(({ activityCategoryId }) => this.activityService.getActivityCategory(activityCategoryId).pipe(
      map(res => setActivityCategory({ activityCategory: res.activityCategory }))
    ))
  ));

  createActivityCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCreateActivityCategory),
    concatMap(({ fields }) => this.activityService.createActivityCategory(fields).pipe(
      map(res => createActivityCategory({ activityCategory: res.createdActivityCategory }))
    ))
  ));

  updateActivityCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateActivityCategory),
    concatMap(({ activityCategoryId, fields }) => this.activityService.updateActivityCategory(activityCategoryId, fields).pipe(
      map(res => updateActivityCategory({ activityCategoryId: res.updatedActivityCategory.Id, fields: res.updatedActivityCategory }))
    ))
  ));

  removeActivityCategoriesConfrimation$ = createEffect(() => this.actions$.pipe(
    ofType(removeActivityCategoriesConfirmation),
    //mergeMap(({ activityCategoryIds, keepActivities }) => of({ activityCategoryIds, keepActivities }).pipe(
    //  withLatestFrom(this.store.select(getActivityCategory({ Id: activityCategoryIds[0] })))
    //)),
    map(({ activityCategory }) => showAlert({
      options: {
        subHeader: 'Anda akan menghapus kategori aktivitas ini',
        message: 'Apakah anda yakin ingin menghapus kategori aktivitas ini?',
        buttons: [
          {
            text: 'Tetap simpan',
            role: 'cancel',
          },
          {
            text: 'Hapus',
            handler: () => {
              if (activityCategory.activities.length > 0) {
                this.store.dispatch(showAlert({
                  options: {
                    subHeader: `Kategori yang akan dihapus memiliki ${activityCategory.activities.length} aktivitas`,
                    message: 'Apakah anda ingin tetap menyimpan aktivitas?',
                    buttons: [
                      {
                        text: 'Tetap simpan',
                        handler: () => {
                          this.store.dispatch(fetchRemoveActivityCategories({ activityCategoryIds: [activityCategory.Id], keepActivities: true }));
                          this.store.dispatch(navigateGo({ path: ['/settings/activities'] }));
                        }
                      },
                      {
                        text: 'Hapus semua aktivitas',
                        handler: () => {
                          this.store.dispatch(fetchRemoveActivityCategories({ activityCategoryIds: [activityCategory.Id] }));
                          this.store.dispatch(navigateGo({ path: ['/settings/activities'] }));
                        }
                      }
                    ]
                  }
                }));
              } else {
                this.store.dispatch(fetchRemoveActivityCategories({ activityCategoryIds: [activityCategory.Id] }));
                this.store.dispatch(navigateGo({ path: ['/settings/activities'] }));
              }
            }
          }
        ]
      }
    }))
  ));

  removeActivityCategories$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveActivityCategories),
    mergeMap(({ activityCategoryIds, keepActivities }) => this.activityService.removeActivityCategories(activityCategoryIds, keepActivities).pipe(
      map(res => removeActivityCategories({ activityCategoryIds: res.removedActivityCategories, keepActivities: keepActivities }))
    ))
  ));

  reorderActivityCategory$ = createEffect(() => this.actions$.pipe(
    ofType(fetchReOrderActivityCategory),
    withLatestFrom(this.store.select(getActivityCategories)),
    mergeMap(([props, activityCategories]) => this.activityService.reorderActivityCategory([...activityCategories].map((activityCategory, index) => activityCategory.Id)))
  ), { dispatch: false });

  constructor(private store: Store, private ngZone: NgZone, private actions$: Actions, private activityService: ActivityService) { }
};
