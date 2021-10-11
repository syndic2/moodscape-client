import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Mood } from 'src/app/models/mood.model';
import { StoreFeatureKeys  } from '../feature-keys';
import { MoodState } from '../states';

const getMoodsCount= (moods: Mood[]) => {
  const moodsCount= {
    gembira: 0,
    senang: 0,
    netral: 0,
    sedih: 0,
    buruk: 0
  };

  moods.forEach(mood => {
    if (mood.emoticon.name === 'gembira') moodsCount.gembira++;
    else if (mood.emoticon.name === 'senang') moodsCount.senang++;
    else if (mood.emoticon.name === 'netral') moodsCount.netral++;
    else if (mood.emoticon.name === 'sedih') moodsCount.sedih++;
    else if (mood.emoticon.name === 'buruk') moodsCount.buruk++;
  });

  return moodsCount;
};

const selectMoodFeature= createFeatureSelector<MoodState>(StoreFeatureKeys.MOOD);

export const getMoods= createSelector(
  selectMoodFeature,
  state => state.moods
);

export const getMoodsChartByMonthYear= (month: number= new Date().getMonth(), year: number= new Date().getFullYear()) => {
  return createSelector(
    selectMoodFeature,
    state => state.moodsChart[month]?.moodAverageGroupByYear?.find(mood => mood.year === year)
  )
};

export const getMoodSearchResults= createSelector(
  selectMoodFeature,
  state => state.moodSearchResults
);

export const getGroupedMoodsByDate= (stateName: string) => {
  return createSelector(
    selectMoodFeature,
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

export const getMoodsByMonth= (month: number, year: number) => {
  return createSelector(
    selectMoodFeature,
    state => {
      const moods= state.moods.filter(mood => {
        const createdAt= new Date(mood.createdAt.date);

        return createdAt.getMonth() === month && createdAt.getFullYear() === year;
      });

      return {
        moods: moods,
        moodsCount: getMoodsCount(moods)
      }
    }
  );
};

export const getMoodsByDate= (date: string) => {
  return createSelector(
    getMoodsByMonth(new Date(date).getMonth(), new Date(date).getFullYear()),
    state => {
      const moods= state.moods.filter(mood => mood.createdAt.date === date);

      return {
        moods: moods,
        moodsCount: getMoodsCount(moods)
      }
    }
  );
};

export const getMood= (props) => {
  return createSelector(
    getMoods,
    state => state.find(object => object.Id === props.Id)
  );
};

export const getMoodsTotalCount= createSelector(
  selectMoodFeature,
  state => getMoodsCount(state.moods)
);
