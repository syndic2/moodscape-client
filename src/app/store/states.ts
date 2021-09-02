import { User } from '../models/user.model';
import { Mood } from '../models/mood.model';
import { Habit } from '../models/habit.model';
import { ActivityIcon, Activity, ActivityCategory } from '../models/activity.model';
import { Article, ArticlePagination } from '../models/article.model';

export interface ApplicationState {
  readonly isResetForm: boolean;
};

export interface AuthenticationState {
  readonly authUser: User;
};

export interface MoodState {
  readonly moods: Mood[],
  readonly moodSearchResults: Mood[],
};

export interface HabitState {
  readonly habits: Habit[],
  readonly habitSearchResults: Habit[],
};

export interface ActivityState {
  readonly activityIcons: ActivityIcon[],
  readonly activityCategories: ActivityCategory[],
  readonly keepedActivties: Activity[],
  readonly reorderedActivityCategories?: number[]
};

export interface ArticleState {
  readonly featuredArticles: Article[],
  readonly articlePagination: ArticlePagination,
  readonly archivedArticles: Article[],
  readonly articleSearchResults: Article[]
};
