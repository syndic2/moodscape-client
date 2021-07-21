import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ActivitiesState } from '../states';

export const selectActivitiesFeature= createFeatureSelector<ActivitiesState>(StoreFeatureKeys.ActivitiesState);

export const selectActivityCategoryList= createSelector(
  selectActivitiesFeature,
  state => state.activityCategories.map((object, index) => ({
    Id: object.Id,
    category: object.category,
    activitiesCount: object.activities.length
  }))
);

export const selectUnkeepedActivities= createSelector(
  selectActivitiesFeature,
  state => state.activityCategories
);

export const selectKeepedActivities= createSelector(
  selectActivitiesFeature,
  state => state.keepedActivties
);

export const selectAllActivity= createSelector(
  selectUnkeepedActivities,
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

export const selectCheckedUnkeepedActivities= (props) => {
  return createSelector(
    selectUnkeepedActivities,
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
    selectAllActivity,
    state => state.find(object => object.Id === props.Id)
  );
};

export const selectActivityCategory= (props) => {
  return createSelector(
    selectUnkeepedActivities,
    state => state.find(object => object.Id === props.Id)
  );
};
