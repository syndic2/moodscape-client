import { Activity } from "./activity";

export interface ActivityCategory {
  Id: number;
  userId: string;
  activities: Activity[];
}
