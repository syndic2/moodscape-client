export enum HABIT_LABEL_COLOR {
  RED= '#FF0000',
  PINK= '#FFC0CB',
  ORANGE= '#FF8C00',
  BLUE= '#0000FF',
  GREEN= '#00FF00'
};

export interface Habit {
  Id: number,
  name: string,
  description?: string,
  type: string,
  day: string,
  goal: number,
  completeTargetBy: string,
  reminderAt?: string,
  labelColor: string,
  createdAt: string
};