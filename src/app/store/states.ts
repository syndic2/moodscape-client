<<<<<<< HEAD
import { User } from '../models/user.model';
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Mood } from '../models/mood.model';
import { Habit } from '../models/habit.model';
import { ActivityIcon, Activity, ActivityCategory } from '../models/activity.model';
import { Article, ArticlePagination } from '../models/article.model';

<<<<<<< HEAD
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

=======
export interface MoodState {
  readonly moods: Mood[],
  readonly moodSearchResults: Mood[],
};

export interface HabitState {
  readonly habits: Habit[],
  readonly habitSearchResults: Habit[],
};

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
export interface ActivityState {
  readonly activityIcons: ActivityIcon[],
  readonly activityCategories: ActivityCategory[],
  readonly keepedActivties: Activity[],
  readonly reorderedActivityCategories?: number[]
};

export interface ArticleState {
<<<<<<< HEAD
  readonly featuredArticles: Article[],
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  readonly articlePagination: ArticlePagination,
  readonly archivedArticles: Article[],
  readonly articleSearchResults: Article[]
};
