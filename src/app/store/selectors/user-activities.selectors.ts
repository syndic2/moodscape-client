import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { UserActivitesState } from '../states';

export const selectActivityCategoriesFeature= createFeatureSelector<UserActivitesState>(StoreFeatureKeys.UserActivities);

export const selectActivityCategoryList= createSelector(
  selectActivityCategoriesFeature,
  state => state.activityCategories.map((object, index) => ({
    Id: object.Id,
    category: object.category,
    activitiesCount: object.activities.length
  }))
);

export const selectUserActivities= createSelector(
  selectActivityCategoriesFeature,
  state => state.activityCategories
);

export const selectKeepedActivities= createSelector(
  selectActivityCategoriesFeature,
  state => state.keepedActivties
);

export const selectActivities= createSelector(
  selectUserActivities,
  selectKeepedActivities,
  (activityCategories, keepedActivities) => {
    let activities= [];

    activityCategories.forEach((activityCategory, index) => {
      activities= [...activities , ...activityCategory.activities.map((activity, index) => ({
          Id: activity.Id,
          name: activity.name,
          icon: activity.icon,
          activityCategory: activityCategory
        }))
      ];
    });

    keepedActivities.forEach((object, index) => {
      activities= [...activities, object];
    });

    return activities;
  }
);

export const selectCheckedUserActivities= (props) => {
  return createSelector(
    selectUserActivities,
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

export const selectCheckedKeepedActivities= (props) => {
  return createSelector(
    selectKeepedActivities,
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

export const selectActivity= (props) => {
  return createSelector(
    selectActivities,
    state => state.find(object => object.Id === props.Id)
  );
};

export const selectActivityCategory= (props) => {
  return createSelector(
    selectUserActivities,
    state => state.find(object => object.Id === props.Id)
  );
};
