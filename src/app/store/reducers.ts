import { ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';

import { StoreFeatureKeys } from './feature-keys';
import { logout } from './actions/authentication.actions';
import { applicationReducer } from './reducers/application.reducer';
import { authenticationReducer } from './reducers/authentication.reducer';
import { moodReducer } from './reducers/mood.reducer';
import { habitReducer } from './reducers/habit.reducer';
import { activityReducer } from './reducers/activity.reducer';
import { articleReducer } from './reducers/article.reducer';

export const reducers: ActionReducerMap<any> = {
  [StoreFeatureKeys.APPLICATION]: applicationReducer,
  [StoreFeatureKeys.AUTHENTIACTION]: authenticationReducer,
  [StoreFeatureKeys.MOOD]: moodReducer,
  [StoreFeatureKeys.HABIT]: habitReducer,
  [StoreFeatureKeys.ACTIVITY]: activityReducer,
  [StoreFeatureKeys.ARTICLE]: articleReducer
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
};

const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }

    return reducer(state, action);
  }
};

export const metaReducers: MetaReducer<any>[] = [logoutMeta];
