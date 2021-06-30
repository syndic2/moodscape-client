export interface Emoticon {
  name: string;
  value: number;
  icon: string;
};

export interface Mood {
  Id: number;
  mood: string;
  timestamps: { date: string, time: string }
  parameters: { internal?: string, external?: string };
  activity_ids?: number[];
  note?: string;
  imgPaths?: string[];
};
