import { Activity } from "./activity.model";

export interface Emoticon {
  name: string;
  value: number;
  icon: string;
};

export interface Mood {
  Id: number;
  emoticon: Emoticon,
  timestamps: { date: string, time: string }
  parameters: { internal?: string, external?: string };
  activities?: Activity[];
  note?: string;
  imgPaths?: string[];
};
