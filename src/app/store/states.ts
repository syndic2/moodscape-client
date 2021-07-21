import { Mood } from "../models/mood.model";
import { Habit } from "../models/habit.model";
import { Activity, ActivityCategory } from "../models/activity.model";

export interface MoodsState {
  readonly moods: Mood[];
};

export interface HabitsState {
  readonly habits: Habit[];
};

export interface ActivitiesState {
  readonly activityCategories: ActivityCategory[];
  readonly keepedActivties: Activity[];
};
