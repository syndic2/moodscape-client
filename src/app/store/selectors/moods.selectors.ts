import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys  } from '../feature-keys';
import { MoodsState } from '../states';

import { MoodEmoticon, FilterMood } from 'src/app/models/mood.model';
import { Activity } from 'src/app/models/activity.model';

export const selectMoodsFeature= createFeatureSelector<MoodsState>(StoreFeatureKeys.MoodsState);

export const selectMoods= createSelector(
  selectMoodsFeature,
  state => state.moods
);

export const selectSearchedMoods= (props: FilterMood) => {
  const filterEmoticon= (emoticon: MoodEmoticon) => {
    return props.emoticon !== null && emoticon.name === props.emoticon.name;
  };

  const filterNote= (note: string) => {
    return props.note && props.searchText !== '' && note.includes(props.searchText);
  };

  const filterParameters= (parameters) => {
    return (props.parameters.internal && props.searchText !== '' && parameters.internal.includes(props.searchText)) ||
      (props.parameters.external && props.searchText !== '' && parameters.external.includes(props.searchText));
  };

  const filterActivities= (activities: Activity[]) => {
    return props.activities.length > 0 && activities.some(object1 => props.activities.find(object2 => object1.Id === object2.Id));
  };

  return createSelector(
    selectMoods,
    state => state.filter((object, index) => {
      return filterEmoticon(object.emoticon) || filterNote(object.note) || filterParameters(object.parameters) || filterActivities(object.activities);
    })
  );
};

export const selectMood= (props) => {
  return createSelector(
    selectMoods,
    state => state.find(object => object.Id === props.Id)
  );
};
