import { on, createReducer } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { EMOTICON_COLORS } from 'src/app/models/mood.model';
import { MoodsState } from '../states';
import { setUserMoods, createMood, updateMood, removeMoods } from '../actions/moods.actions';

const initialState: MoodsState= {
  moods: [
    {
      Id: -1,
      emoticon: {
        name: 'senang',
        value: 4,
        icon: 'icons/svg/emoticons/smile.svg',
        color: EMOTICON_COLORS.SENANG
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
        { Id: -3, name: 'keeped activity 1', icon: 'icon1' },
        { Id: -4, name: 'keeped activity 2', icon: 'icon2' }
      ],
      note: 'initial note1'
    },
    {
      Id: -2,
      emoticon: {
        name: 'netral',
        value: 3,
        icon: 'icons/svg/emoticons/neutral.svg',
        color: EMOTICON_COLORS.NETRAL
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
        { Id: -1, name: 'initial other category activity1', icon: 'icon1' },
        { Id: -2, name: 'initial other category activity2', icon: 'icon2' }
      ],
      note: 'initial note2'
    }
  ]
};

export const moodsReducer= createReducer(
  initialState,
  on(setUserMoods, (state, { userMoods }) => ({ ...state, moods: [...userMoods] })),

  on(createMood, (state, { mood }) => ({ ...state, moods: [...state.moods, mood] })),

  on(updateMood, (state, { moodId, fields }) => ({
    ...state,
    moods: [
      ...state.moods.map((object, index) => {
        if (object.Id !== moodId) {
          return object;
        }

        return { ...object, ...fields };
      })
    ]
  })),

  on(removeMoods, (state, { moodIds }) => ({
    ...state,
    moods: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.moods },
        { type: 'none-object', items: moodIds },
        { field1: 'Id' }
      )
    ]
  }))
);
