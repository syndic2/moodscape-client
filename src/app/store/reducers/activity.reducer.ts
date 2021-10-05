import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from '../../utilities/helpers';
import { Activity, ActivityCategory } from '../../models/activity.model';
import { ActivityState } from '../states';
import {
  /**
   * Activity
   */
  setActivityIcons,
  setActivity,
  createActivity,
  updateActivity,
  removeActivities,
  moveActivitiesIntoCategory,

  /**
   * Activity categories
   */
  setActivityCategories,  
  setActivitiesNonetCategory,
  setActivityCategory,
  createActivityCategory,
  updateActivityCategory,
  removeActivityCategories,
  reorderActivityCategory,
} from '../actions/activity.actions';

const initialState: ActivityState= {
  activityIcons: [],
  activityCategories: [],
  keepedActivties: [],
  //reorderedActivityCategories: []
};

export const activityReducer= createReducer(
  initialState,

  /**
   * Activity
   */
  on(setActivityIcons, (state, { activityIcons }) => ({ ...state, activityIcons: [...activityIcons] })),

  on(setActivity, (state, { activity, activityCategoryId }) => {
    if (!activityCategoryId) {
      return {
        ...state,
        keepedActivties: [
          ...state.keepedActivties.map((object, index) => {
            if (object.Id !== activity.Id) {
              return object;
            }

            return activity;
          })
        ]
      }
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((activityCategory, index) => {
          if (activityCategory.Id !== activityCategoryId) {
            return activityCategory;
          }

          return {
            ...activityCategory,
            activities: [
              ...activityCategory.activities.map((object, index) => {
                if (object.Id !== activity.Id) {
                  return object;
                }

                return activity;
              })
            ]
          }
        })
      ]
    }
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
    //const checkInKeepedActvities= state.keepedActivties.find(activity => activity.Id === activityId);

    if (!activityCategoryId) {
      return {
        ...state,
        keepedActivties: [
          ...state.keepedActivties.map((activity, index) => {
            if (activity.Id !== activityId) {
              return activity;
            }

            return { ...activity, ...fields }
          })
        ]
      }
    }

    return {
      ...state,
      activityCategories: [
        ...state.activityCategories.map((activityCategory, index) => {
          if (activityCategory.Id !== activityCategoryId) {
            return activityCategory;
          }

          return {
            ...activityCategory,
            activities: [
              ...activityCategory.activities.map((activity, index) => {
                if (activity.Id !== activityId) {
                  return activity;
                }

                return { ...activity, ...fields }
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
        ...state.activityCategories.map((activityCategory, index) => {
          if (activityCategory.Id !== activityCategoryId) {
            return activityCategory;
          }

          return {
            ...activityCategory,
            activities: [
              ...filterArrayByAnotherArray(
                { type: 'object', items: activityCategory.activities },
                { type: 'none-object', items: activityIds },
                { field1: 'Id' }
              )
            ]
          }
        })
      ]
    }
  })),

  on(moveActivitiesIntoCategory, (state, { activities, fromCategoryId, toCategoryId }) => {
    if (!fromCategoryId) {
      return {
        ...state,
        activityCategories: [
          ...state.activityCategories.map((activityCategory, index) => {
            if (activityCategory.Id !== toCategoryId) {
              return activityCategory;
            }

            return {
              ...activityCategory,
              activities: [...activityCategory.activities, ...activities]
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
        ...state.activityCategories.map((activityCategory, index) => {
          if (activityCategory.Id === fromCategoryId) {
            return {
              ...activityCategory,
              activities: [
                ...filterArrayByAnotherArray(
                  { type: 'object', items: activityCategory.activities },
                  { type: 'object', items: activities },
                  { field1: 'Id', field2: 'Id' }
                )
              ]
            };
          } else if (activityCategory.Id === toCategoryId) {
            return {
              ...activityCategory,
              activities: [...activityCategory.activities, ...activities]
            };
          } 

          return activityCategory;
        })
      ]
    };
  }),

  /**
   * Activity Category
   */
   on(setActivityCategories, (state, { activityCategories }) => ({ 
    ...state, 
    activityCategories: [...activityCategories],
    reorderedActivityCategories: [...new Array(activityCategories.length+1).keys()]
  })),

  on(setActivitiesNonetCategory, (state, { activities }) => ({ ...state, keepedActivties: [...activities] })),

  on(setActivityCategory, (state, { activityCategory }) => ({ 
    ...state,
    activityCategories: [
      ...state.activityCategories.map((object, index) => {
        if (object.Id === activityCategory.Id) {
          return activityCategory;
        }

        return object;
      })
    ] 
  })),

  on(createActivityCategory, (state, { activityCategory }) => ({...state, activityCategories: [...state.activityCategories, activityCategory] })),

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
  }),

  on(reorderActivityCategory, (state, { from, to }) => {
    const activityCategories= [...state.activityCategories];
    let itemToMove1= activityCategories.splice(from, 1)[0];
    activityCategories.splice(to, 0, itemToMove1);

    //const reorderedActivityCategories= [...state.reorderedActivityCategories];
    //let itemToMove2= reorderedActivityCategories.splice(from, 1)[0];
    //reorderedActivityCategories.splice(to, 0, itemToMove2)

    return {
      ...state,
      activityCategories: activityCategories,
      //reorderedActivityCategories: reorderedActivityCategories
    };
  })
);


