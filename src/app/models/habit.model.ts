export enum HABIT_LABEL_COLORS {
  RED = '#FF0000',
  PINK = '#FFC0CB',
  ORANGE = '#FF8C00',
  BLUE = '#0000FF',
  GREEN = '#358873'
}

export interface HabitStreakLog {
  startDate: string;
  endDate: string;
  currentGoal: number;
  targetGoal: number;
  lastMarkedAt: string;
  isComplete: boolean;
  markedAt: string[];
}

export interface HabitTrack {
  totalCompleted: number;
  totalStreaks: number;
  streakLogs: HabitStreakLog[];
}

export interface Habit {
  Id: number;
  name: string;
  description: string;
  createdAt: { date: string, time: string };
  type: string;
  day: string;
  goal: number;
  goalDates: { start: string, end: string };
  reminderTime: string;
  isReminder: boolean;
  labelColor: string;
  track: HabitTrack;
}

export interface HabitFilter {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  reminderTime: string;
  labelColor: string;
}

export interface HabitAverageGroupByYear {
  year: number;
  habits: Habit[];
  average: number;
}

export interface HabitsAverageGroupByMonth {
  group: string;
  habitAverageGroupByYear: HabitAverageGroupByYear[];
}
