import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { HABIT_LABEL_COLOR } from 'src/app/models/habit.model';
import { HabitsState } from '../states';
import { setUserHabits, markGoalHabit, createHabit, updateHabit, removeHabits } from '../actions/habits.actions';

const initialState: HabitsState= {
  habits: [
    {
      Id: -1,
      name: 'Mengerjakan Tugas Akhir selama 3 jam per hari',
      description: 'Kerja Tugas Akhir',
      day: 'all days',
      type: 'good habit',
      goal: 3,
      completeTargetBy: '2021-30-07',
      reminderAt: '11:00',
      labelColor: HABIT_LABEL_COLOR.ORANGE,
      createdAt: ''
    },
    {
      Id: -2,
      name: 'Bermain DOTA 2 selama 2 jam',
      description: 'Menghilangkan penat kerja skripsi',
      day: 'saturday',
      type: 'bad habit',
      goal: 2,
      completeTargetBy: '2021-31-07',
      reminderAt: '11:00',
      labelColor: HABIT_LABEL_COLOR.RED,
      createdAt: ''
    }
  ]
};

export const habitsReducer= createReducer(
  initialState,
  on(setUserHabits, (state, { userHabits }) => ({ ...state, habits: [...userHabits] })),

  on(createHabit, (state, { habit }) => ({ ...state, habits: [...state.habits, habit] })),

  on(updateHabit, (state, { habitId, fields }) => ({
    ...state,
    habits: [
      ...state.habits.map((object, index) => {
        if (object.Id !== habitId) {
          return object;
        }

        return { ...object, ...fields };
      })
    ]
  })),

  on(removeHabits, (state, { habitIds }) => ({
    ...state,
    habits: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.habits },
        { type: 'none-object', items: habitIds },
        { field1: 'Id' }
      )
    ]
  }))
);