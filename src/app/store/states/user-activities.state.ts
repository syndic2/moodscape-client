import { Activity } from '../../models/activities/activity.model';
import { ActivityCategory } from '../../models/activities/activity-category.model';

export interface UserActivitesState {
  readonly activityCategories: ActivityCategory[];
  readonly keepedActivties: Activity[];
};
