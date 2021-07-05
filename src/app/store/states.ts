import { Activity, ActivityCategory } from "../models/activity.model";

export interface UserActivitesState {
  readonly activityCategories: ActivityCategory[];
  readonly keepedActivties: Activity[];
};
