import { Activity } from "./activity.model";

export enum MOOD_EMOTICON_COLORS {
  GEMBIRA = '#3CB403',
  SENANG = '#B4CC4E',
  NETRAL = '#FFD300',
  SEDIH = '#FFC30B',
  BURUK = '#D0312D'
}

export enum MOOD_ICON_PATHS {
  GEMBIRA = 'icons/svg/emoticons/happy.svg',
  SENANG = 'icons/svg/emoticons/smile.svg',
  NETRAL = 'icons/svg/emoticons/neutral.svg',
  SEDIH = 'icons/svg/emoticons/sad.svg',
  BURUK = 'icons/svg/emoticons/awful.svg'
}

export interface Mood {
  Id: number;
  emoticon: MoodEmoticon;
  parameters: { internal?: string, external?: string };
  activities: Activity[];
  note: string;
  createdAt: { date: string, time: string };
  //imgPaths?: string[];
}

export interface MoodEmoticon {
  name: string;
  value: number;
  iconPath: string;
  color: string;
}

export interface MoodFilter {
  searchText: string;
  emoticon: MoodEmoticon;
  parameters: { internal?: boolean, external?: boolean };
  activities: Activity[];
  note: boolean;
  createdDate: { start: string, end: string }
}

export interface MoodAverageByRangeDate {
  startDate: number;
  endDate: number;
  moods: Mood[];
  average: number;
};

export interface MoodAverageGroupByYear {
  year: number;
  moodAverageByRangeDate: MoodAverageByRangeDate[];
}

export interface MoodsAverageGroupByMonth {
  group: string;
  moodAverageGroupByYear: MoodAverageGroupByYear[];
}
