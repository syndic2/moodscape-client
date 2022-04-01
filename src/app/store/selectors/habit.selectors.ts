import { createSelector, createFeatureSelector } from '@ngrx/store';

import { transformDateTime } from 'src/app/utilities/helpers';
import { StoreFeatureKeys } from '../feature-keys';
import { HabitState } from '../states';
import { HabitStreakLog } from 'src/app/models/habit.model';

const selectHabitFeature = createFeatureSelector<HabitState>(StoreFeatureKeys.HABIT);

export const getHabits = (day: string = '', groupBy: string = 'all') => {
  return createSelector(
    selectHabitFeature,
    state => {
      let habits = [...state.habits];
      habits = habits.sort((a, b) => b.Id - a.Id);

      if (day !== '') habits = habits.filter(habit => habit.day === day);

      if (groupBy === 'marked') {
        habits = habits.filter(habit =>
          habit.track.streakLogs.find(log => log.isComplete === true || log.startDate === habit.goalDates.start && log.lastMarkedAt === transformDateTime(new Date()).toISODate())
        );
      } else if (groupBy === 'unmarked') {
        habits = habits.filter(habit => {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          const startDate = new Date(habit.goalDates.start);
          startDate.setHours(0, 0, 0, 0);

          const endDate = new Date(habit.goalDates.end);
          endDate.setHours(0, 0, 0, 0);

          return habit.track.streakLogs.find(log => log.isComplete === false && log.startDate === habit.goalDates.start &&
            log.lastMarkedAt !== transformDateTime(currentDate).toISODate() && (currentDate >= startDate && currentDate <= endDate))
        });
      } else if (groupBy === 'failed') {
        habits = habits.filter(habit => {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          const endDate = new Date(habit.goalDates.end);
          endDate.setHours(0, 0, 0, 0);

          return habit.track.streakLogs.find(log => log.isComplete === false && log.startDate === habit.goalDates.start && currentDate > endDate)
        });
      }

      return habits;
    }
  );
};

export const getHabitsChartByYear = (year: number = new Date().getFullYear()) => {
  return createSelector(
    selectHabitFeature,
    state => {
      const monthGroups = state.habitsChart.filter(monthGroup => monthGroup.habitAverageGroupByYear.find(yearGroup => yearGroup.year === year))

      return monthGroups.map(monthGroup => ({
        group: monthGroup.group,
        habitAverageGroupByYear: monthGroup.habitAverageGroupByYear.find(yearGroup => yearGroup.year === year)
      }))
    }
    // state => state.habitsChart.map(monthGroup => {
    //   return {
    //     group: monthGroup.group,
    //     habitAverageGroupByYear: monthGroup.habitAverageGroupByYear.find(yearGroup => yearGroup.year === year)
    //   }
    // })
  );
};

export const getHabitsByMonth = (month: number, year: number) => {
  return createSelector(
    getHabits(),
    state => state.filter((habit, index) => {
      const goalStartDate = new Date(habit.goalDates.start);

      return goalStartDate.getMonth() === month && goalStartDate.getFullYear() === year;
    })
  );
};

export const getHabitsByDate = (date: string) => {
  return createSelector(
    getHabitsByMonth(new Date(date).getMonth(), new Date(date).getFullYear()),
    state => state.filter(habit => habit.goalDates.start === date)
  );
};

export const getHabitsByBestStreaks = (topLength: number = 5) => {
  return createSelector(
    getHabits(),
    state => [...state]
      .sort((a, b) => b.track.totalStreaks - a.track.totalStreaks)
      .slice(0, topLength)
      .map(habit => ({ name: habit.name, goalDates: habit.goalDates, totalStreaks: habit.track.totalStreaks }))
  );
};

export const getHabitsByTotalCompleted = createSelector(
  getHabits(),
  state => {
    let completes = 0;
    let onProgress = 0;
    let notCompletes = 0;
    let currentTracks: HabitStreakLog[] = [];
    const currentDate = new Date();

    state.forEach(habit => {
      habit.track.streakLogs.forEach(track => {
        if (habit.goalDates.start === track.startDate) currentTracks = [...currentTracks, track];
      });
    });

    currentTracks.forEach(track => {
      if (track.isComplete) completes++;
      else {
        const startDate = new Date(track.startDate);
        const endDate = new Date(track.endDate);

        if (currentDate >= startDate && currentDate <= endDate) {
          onProgress++;
        } else if (currentDate > endDate) {
          notCompletes++;
        }
      }
    });

    return { completes, onProgress, notCompletes };
  }
);

export const getHabit = (habitId: number) => {
  return createSelector(
    getHabits(),
    state => state.find(object => object.Id === habitId)
  )
};

export const getHabitSearchResults = createSelector(
  selectHabitFeature,
  state => state.habitSearchResults
);
