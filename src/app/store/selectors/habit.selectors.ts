import { createSelector, createFeatureSelector } from '@ngrx/store';

import { transformDateTime } from 'src/app/utilities/helpers';
import { StoreFeatureKeys } from '../feature-keys';
import { HabitState } from '../states';

const selectHabitFeature= createFeatureSelector<HabitState>(StoreFeatureKeys.HABIT);

export const getHabits= (day: string= '', groupBy: string= 'all') => {
  return createSelector(
    selectHabitFeature,
    state => {
      let habits= state.habits;

      if (day !== '') habits= habits.filter(habit => habit.day === day);

      if (groupBy === 'marked') {
        habits= habits.filter(habit => 
          habit.track.streakLogs.find(log => log.startDate === habit.goalDates.start && log.lastMarkedAt === transformDateTime(new Date()).toISODate())
        );
      } else if(groupBy === 'unmarked') {
        habits= habits.filter(habit => 
          habit.track.streakLogs.find(log => log.startDate === habit.goalDates.start && log.lastMarkedAt !== transformDateTime(new Date()).toISODate())
        );
      }

      return habits;
    }
  );
};  

export const getHabitsByMonth= (month: number, year: number) => {
  return createSelector(
    getHabits(),
    state => state.filter((habit, index) => {
      const goalStartDate= new Date(habit.goalDates.start);
      
      return goalStartDate.getMonth() === month && goalStartDate.getFullYear() === year;
    })
  );
};

export const getHabitsByDate= (date: string) => {
  return createSelector(
    getHabitsByMonth(new Date(date).getMonth(), new Date(date).getFullYear()),
    state => state.filter(habit => habit.goalDates.start === date)
  );
};

export const getHabit= (habitId: number) => {
  return createSelector(
    getHabits(),
    state => state.find(object => object.Id === habitId)
  )
};