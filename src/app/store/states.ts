import { Mood } from "../models/mood.model";
import { Activity, ActivityCategory } from "../models/activity.model";

export interface UserMoodsState {
  readonly moods: Mood[];
};

export interface UserActivitesState {
  readonly activityCategories: ActivityCategory[];
  readonly keepedActivties: Activity[];
};
