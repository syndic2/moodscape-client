import { Activity } from "./activity.model";

export interface ActivityCategory {
  Id: number;
  category: string;
  activities: Activity[];
}
