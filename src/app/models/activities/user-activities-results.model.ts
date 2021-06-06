import { ActivityCategory } from './activity-category.model';

export interface UserActivitiesResults {
  activitiesWithCategory: ActivityCategory[],
  activitiesWithoutCategory: ActivityCategory
};
