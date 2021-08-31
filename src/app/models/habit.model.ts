export enum HABIT_LABEL_COLORS {
  RED= '#FF0000',
  PINK= '#FFC0CB',
  ORANGE= '#FF8C00',
  BLUE= '#0000FF',
  GREEN= '#358873'
};

export interface HabitTrackDetails {
  currentGoal: number,
  streaks: number,
  lastMarkedAt: string
};

export interface Habit {
  Id: number,
  name: string,
  description: string,
  createdAt: { date: string, time: string },
  type: string,
  day: string,
  goal: number,
  goalDates: { start: string, end: string },
  reminderTime: string,
  labelColor: string,
  trackDetails?: HabitTrackDetails
};