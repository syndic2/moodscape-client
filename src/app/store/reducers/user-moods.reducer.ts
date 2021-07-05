import { on, createReducer } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { Mood } from 'src/app/models/mood.model';
import { setUserMoods, createMood, updateMood, removeMoods } from '../actions/user-moods.actions';

const initialState: Mood[]= [
  {
    Id: -1,
    emoticon: {
      name: 'senang',
      value: 4,
      icon: 'icons/svg/emoticons/smile.svg',
    },
    timestamps: {
      date: '2021-07-05',
      time: '12:05'
    },
    parameters: {
      internal: 'initial internal1',
      external: 'initial external1'
    },
    activities: [
      {
        Id: -1,
        name: 'initial activity1',
        icon: 'icon1'
      },
      {
        Id: -2,
        name: 'initial activity2',
        icon: 'icon2'
      }
    ],
    note: 'initial note1'
  },
  {
    Id: -2,
    emoticon: {
      name: 'netral',
      value: 3,
      icon: 'icons/svg/emoticons/neutral.svg',
    },
    timestamps: {
      date: '2021-07-07',
      time: '12:05'
    },
    parameters: {
      internal: 'initial internal2',
      external: 'initial external2'
    },
    activities: [
      {
        Id: -1,
        name: 'initial activity3',
        icon: 'icon3'
      },
      {
        Id: -2,
        name: 'initial activity4',
        icon: 'icon4'
      }
    ],
    note: 'initial note2'
  }
];

export const userMoodsReducer= createReducer(
  initialState,
  on(setUserMoods, (state, { userMoods }) => [...userMoods]),

  on(createMood, (state, { mood }) => [...state, mood]),

  on(updateMood, (state, { moodId, fields }) => {
    return [
      ...state.map((object, index) => {
        if (object.Id !== moodId) {
          return object;
        }

        return { ...object, ...fields };
      })
    ];
  }),

  on(removeMoods, (state, { moodIds }) => [
    ...filterArrayByAnotherArray(
      { type: 'object', items: state },
      { type: 'none-object', items: moodIds },
      { field1: 'Id', field2: 'Id' }
    )
  ])
);
