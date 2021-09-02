import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ActivityState } from '../states';

const selectActivityFeature= createFeatureSelector<ActivityState>(StoreFeatureKeys.ACTIVITY);

export const gettActivityCategoryList= createSelector(
  selectActivityFeature,
  state => state.activityCategories.map((object, index) => ({
    Id: object.Id,
    category: object.category,
    activitiesCount: object.activities.length
  }))
);

export const getActivityIcons= createSelector(
  selectActivityFeature,
  state => state.activityIcons
);

export const getActivityCategories= createSelector(
  selectActivityFeature,
  state => state.activityCategories
);

export const getKeepedActivities= createSelector(
  selectActivityFeature,
  state => state.keepedActivties
);

export const getReorderedActivityCategories= createSelector(
  selectActivityFeature,
  state => state.reorderedActivityCategories
);

export const gettAllActivity= createSelector(
  getActivityCategories,
  getKeepedActivities,
  (activityCategories, keepedActivities) => {
    let activities= [];

    activityCategories.forEach((activityCategory, index) => {
      activities= [...activities , ...activityCategory.activities.map((activity, index) => ({
          ...activity,
          activityCategory: activityCategory
        }))
      ];
    });

    keepedActivities.forEach((activity, index) => {
      activities= [...activities, activity];
    });

    return activities;
  }
);

export const getCheckedUnkeepedActivities= (props) => {
  return createSelector(
    getActivityCategories,
    state => state.map(activityCategory => {
      return {
        ...activityCategory,
        activities: [
          ...activityCategory.activities.map(userActivity => {
            const activity= props.selectedActivities.find(selected => selected.Id === userActivity.Id);

            if (!activity) {
              return userActivity;
            }

            return {
              ...userActivity,
              isChecked: true
            }
          })
        ]
      };
    })
  );
};

export const getCheckedKeepedActivities= (props) => {
  return createSelector(
    getKeepedActivities,
    state => state.map(keeped => {
      const activity= props.selectedActivities.find(selected => selected.Id === keeped.Id);

      if (!activity) {
        return keeped;
      }

      return {
        ...keeped,
        isChecked: true
      }
    })
  );
};

export const getActivity= (props) => {
  return createSelector(
    gettAllActivity,
    state => state.find(activity => activity.Id === props.Id)
  );
};

export const getActivityCategory= (props) => {
  return createSelector(
    getActivityCategories,
    state => state.find(activityCategory => activityCategory.Id === props.Id)
  );
};
