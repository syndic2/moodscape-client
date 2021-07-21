export interface Habit {
  Id: number,
  name: string,
  description: string, 
  goal: number,
  streaksGoal?: string,
  reminderAt?: string,
  repeatReminder?: string,
  createdAt: string
};