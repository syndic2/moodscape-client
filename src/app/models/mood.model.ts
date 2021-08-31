import { Activity } from "./activity.model";

export enum MOOD_EMOTICON_COLORS {
  GEMBIRA= '#3CB403',
  SENANG= '#B4CC4E',
  NETRAL= '#FFD300',
  SEDIH= '#FFC30B',
  BURUK= '#D0312D'
};  

export interface Mood {
  Id: number,
  emoticon: MoodEmoticon,
  createdAt: { date: string, time: string },
  parameters: { internal?: string, external?: string },
  activities: Activity[],
  note: string,
  //imgPaths?: string[]
};

export interface MoodEmoticon {
  name: string,
  value: number,
  iconPath: string,
  color: string
};

export interface MoodFilter {
  searchText: string,
  emoticon: MoodEmoticon,
  parameters: { internal?: boolean, external?: boolean },
  activities: Activity[],
  note: boolean
};
