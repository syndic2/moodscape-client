import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { HabitState } from '../states';
import { setHabits, setHabitSearchResults, setHabit, createHabit, updateHabit, removeHabits, markHabitGoal } from '../actions/habit.actions';

const initialState: HabitState= {
  habits: [],
  habitSearchResults: []
};

export const habitReducer= createReducer(
  initialState,
  on(setHabits, (state, { habits }) => ({ ...state, habits: [...habits] })),

  on(setHabitSearchResults, (state, { habits }) => ({ ...state, habitSearchResults: [...habits] })),

  on(setHabit, (state, { habit }) => ({ 
    ...state,
    habits: [
      ...state.habits.map((object, index) => {
        if (object.Id !== habit.Id) {
          return object;
        }

        return habit;
      })
    ] 
  })),

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
  })),

  on(markHabitGoal, (state, { habitId, trackDetails }) => ({
    ...state,
    habits: [
      ...state.habits.map((habit, index) => {
        if (habit.Id !== habitId) {
          return habit;
        }
        
        return { ...habit, trackDetails: trackDetails }
      })
    ]
  }))
);