import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from '../../utilities/helpers';
import { Activity, ActivityCategory } from '../../models/activity.model';
import { ActivitiesState } from '../states';
import {
  setUserActivities,
  reorderActivityCategory,
  moveActivitiesIntoCategory,
  createActivity,
  updateActivity,
  removeActivities,
  createActivityCategory,
  updateActivityCategory,
  removeActivityCategories
} from '../actions/activities.actions';

const initialState: ActivitiesState= {
  activityCategories: [
    {
      Id: -1,
      category: 'initial category',
      activities: []
    },
    {
      Id: -2, category: 'initial other category',
      activities: [
        { Id: -1, name: 'initial other category activity1', icon: 'icon1' },
        { Id: -2, name: 'initial other category activity2', icon: 'icon2' }
      ]
    }
  ],
  keepedActivties: [
    { Id: -3, name: 'keeped activity 1', icon: 'icon1' },
    { Id: -4, name: 'keeped activity 2', icon: 'icon2' }
  ]
};

export const activitiesReducer= createReducer(
  initialState,
  on(setUserActivities, ((state, { activities }) => ({ ...state, activityCategories: [...activities] }))),

  on(reorderActivityCategory, (state, { from, to }) => {
    const copyArray= [...state.activityCategories];
    let itemToMove= copyArray.splice(from, 1)[0];

    copyArray.splice(to, 0, itemToMove);

    return {
      ...state,
      activityCategories: copyArray
    };
  }),

  on(moveActivitiesIntoCategory, (state, { activities, fromCategoryId, toCategoryId }) => {
    if (!fromCategoryId) {
      return {
        ...state,
        activityCategories: [
          ...state.activityCategories.map((object, index) => {
            if (object.Id !== toCategoryId) {
              return object;
            }

            return {
              ...object,
              activities: [...object.activities, ...activities]
            }
          })
        ],
        keepedActivties: [
          ...filterArrayByAnotherArray(
            { type: 'object', items: state.keepedActivties },
            { type: 'object', items: activities },
            { field1: 'Id', field2: 'Id' }
          )
        ]
      }
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((object, index) => {
          if (object.Id === fromCategoryId) {
            return {
              ...object,
              activities: [
                ...filterArrayByAnotherArray(
                  { type: 'object', items: object.activities },
                  { type: 'object', items: activities },
                  { field1: 'Id', field2: 'Id' }
                )
              ]
            };
          } else if (object.Id === toCategoryId) {
            return {
              ...object,
              activities: [...object.activities, ...activities]
            };
          } else {
            return object;
          }
        })
      ]
    };
  }),

  on(createActivity, (state, { activity, activityCategoryId }) => {
    if (!activityCategoryId) {
      return {
        ...state,
        keepedActivties: [...state.keepedActivties, activity]
      }
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((object, index) => {
          if (object.Id !== activityCategoryId) {
            return object;
          }

          return {
            ...object,
            activities: [...object.activities, activity]
          }
        })
      ]
    };
  }),

  on(updateActivity, ((state, { activityId, fields, activityCategoryId }) => {
    const checkInKeepedActvities= state.keepedActivties.find(object => object.Id === activityId);

    if (checkInKeepedActvities) {
      return {
        ...state,
        keepedActivties: [
          ...state.keepedActivties.map((object, index) => {
            if (object.Id !== activityId) {
              return object;
            }

            return { ...object, ...fields }
          })
        ]
      }
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((object, index) => {
          if (object.Id !== activityCategoryId) {
            return object;
          }

          return {
            ...object,
            activities: [
              ...object.activities.map((object, index) => {
                if (object.Id !== activityId) {
                  return object;
                }

                return { ...object, ...fields }
              })
            ]
          }
        })
      ]
    };
  })),

  on(removeActivities, ((state, { activityIds, activityCategoryId }) => {
    if (!activityCategoryId) {
      return {
        ...state,
        keepedActivties: [
          ...filterArrayByAnotherArray(
            { type: 'object', items: state.keepedActivties },
            { type: 'none-object', items: activityIds },
            { field1: 'Id' }
          )
        ]
      };
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((object, index) => {
          if (object.Id !== activityCategoryId) {
            return object;
          }

          return {
            ...object,
            activities: [
              ...filterArrayByAnotherArray(
                { type: 'object', items: object.activities },
                { type: 'none-object', items: activityIds },
                { field1: 'Id' }
              )
            ]
          }
        })
      ]
    }
  })),

  on(createActivityCategory, (state, { activityCategory }) => ({
    ...state,
    activityCategories: [...state.activityCategories, activityCategory],
    keepedActivties: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.keepedActivties },
        { type: 'object', items: activityCategory.activities },
        { field1: 'Id', field2: 'Id' }
      )
    ]
  })),

  on(updateActivityCategory, (state, { activityCategoryId, fields }) => ({
    ...state,
    activityCategories: [
      ...state.activityCategories.map((object, index) => {
        if (object.Id !== activityCategoryId) {
          return object;
        }

        return { ...object, ...fields }
      })
    ]
  })),

  on(removeActivityCategories, (state, { activityCategoryIds, keepActivities }) => {
    if (keepActivities) {
      const removedActivityCategories: ActivityCategory[]= [
        ...filterArrayByAnotherArray(
          { type: 'object', items: state.activityCategories },
          { type: 'none-object', items: activityCategoryIds },
          { field1: 'Id' },
          false
        )
      ];
      let activitiesFromRemovedCategories: Activity[]= [];

      removedActivityCategories.forEach((object, index) => {
        activitiesFromRemovedCategories= [...object.activities];
      });

      return {
        ...state,
        activityCategories: [
          ...filterArrayByAnotherArray(
            { type: 'object', items: state.activityCategories },
            { type: 'none-object', items: activityCategoryIds },
            { field1: 'Id' }
          )
        ],
        keepedActivties: [...state.keepedActivties, ...activitiesFromRemovedCategories]
      }
    };

    return {
      ...state,
      activityCategories: [
        ...filterArrayByAnotherArray(
          { type: 'object', items: state.activityCategories },
          { type: 'none-object', items: activityCategoryIds },
          { field1: 'Id' }
        )
      ]
    };
  })
);


