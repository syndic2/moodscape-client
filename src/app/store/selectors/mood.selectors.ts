import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys  } from '../feature-keys';
import { MoodState } from '../states';

<<<<<<< HEAD
const selectMoodsFeature= createFeatureSelector<MoodState>(StoreFeatureKeys.MOOD);
=======
export const selectMoodsFeature= createFeatureSelector<MoodState>(StoreFeatureKeys.MOOD);
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

export const getMoods= createSelector(
  selectMoodsFeature,
  state => state.moods
);

export const getMoodSearchResults= createSelector(
  selectMoodsFeature,
  state => state.moodSearchResults
);

export const getGroupedMoodsByDate= (stateName: string) => {
  return createSelector(
    selectMoodsFeature,
    state => (stateName === 'moods' ? state.moods : state.moodSearchResults).reduce((groupedMood, mood) => {
      const dateProp= mood.createdAt?.date;
      
      if (groupedMood[dateProp] == null) 
        groupedMood[dateProp]= [];
      
      groupedMood[dateProp].push(mood);
      groupedMood[dateProp].sort((a, b) => a.createdAt.time > b.createdAt.time ? -1 : 1);

      return groupedMood; 
    }, {})
  );
}; 

export const getMood= (props) => {
  return createSelector(
    getMoods,
    state => state.find(object => object.Id === props.Id)
  );
};
