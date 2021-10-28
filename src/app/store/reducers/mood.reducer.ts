import { on, createReducer } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { MoodState } from '../states';
import { setMoods, setMoodsChart, setMood, setMoodSearchResults, createMood, updateMood, removeMoods } from '../actions/mood.actions';

const initialState: MoodState= {
  moods: [],
  moodSearchResults: [],
  moodsChart: []
};

export const moodReducer= createReducer(
  initialState,
  on(setMoods, (state, { moods }) => ({ ...state, moods: [...moods] })),

  on(setMoodsChart, (state, { moodsChart }) => ({ ...state, moodsChart: [...moodsChart] })),

  on(setMood, (state, { mood }) => ({
    ...state,
    moods: [
      ...state.moods.map((object, index) => {
        if (object.Id !== mood.Id) {
          return object;
        }

        return mood;
      })
    ]
  })),

  on(setMoodSearchResults, (state, { moods }) => ({ ...state, moodSearchResults: [...moods] })),

  on(createMood, (state, { mood }) => ({ ...state, moods: [...state.moods, mood] })),

  on(updateMood, (state, { moodId, fields }) => ({
    ...state,
    moods: [
      ...state.moods.map((mood, index) => {
        if (mood.Id !== moodId) {
          return mood;
        }
        
        return { ...mood, ...fields };
      })
    ]
  })),

  on(removeMoods, (state, { moodIds, removeFromSearchResults }) => {
    if (!removeFromSearchResults) {
      return {
        ...state,
        moods: [
          ...filterArrayByAnotherArray(
            { type: 'object', items: state.moods },
            { type: 'none-object', items: moodIds },
            { field1: 'Id' }
          )
        ]
      };
    }

    return {
      ...state,
      moods: [
        ...filterArrayByAnotherArray(
          { type: 'object', items: state.moods },
          { type: 'none-object', items: moodIds },
          { field1: 'Id' }
        )
      ],
      moodSearchResults: [
        ...filterArrayByAnotherArray(
          { type: 'object', items: state.moodSearchResults },
          { type: 'none-object', items: moodIds },
          { field1: 'Id' }
        )
      ]
    };
  })
);
