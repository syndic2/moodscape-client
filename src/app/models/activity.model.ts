export interface ActivityIcon {
  Id: number;
  name: string;
}

export interface Activity {
  Id: number;
  name: string;
  icon: string;
}

export interface ActivityCategory {
  Id: number;
  category: string;
  activities: Activity[];
}

export interface ActivityCategoryList {
  Id: number;
  category: string;
  activitiesCount: number;
}


