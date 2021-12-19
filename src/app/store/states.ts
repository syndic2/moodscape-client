import { User } from '../models/user.model';
import { Mood, MoodsAverageGroupByMonth } from '../models/mood.model';
import { Habit, HabitsAverageGroupByMonth } from '../models/habit.model';
import { ActivityIcon, Activity, ActivityCategory } from '../models/activity.model';
import { Article, ArticlePagination } from '../models/article.model';

export interface ApplicationState {
  readonly isResetForm: boolean;
}

export interface AuthenticationState {
  readonly authUser: User;
}

export interface MoodState {
  readonly moods: Mood[];
  readonly moodSearchResults: Mood[];
  readonly moodsChart: MoodsAverageGroupByMonth[];
}

export interface HabitState {
  readonly habits: Habit[];
  readonly habitSearchResults: Habit[];
  readonly habitsChart: HabitsAverageGroupByMonth[];
}

export interface ActivityState {
  readonly activityIcons: ActivityIcon[];
  readonly activityCategories: ActivityCategory[];
  readonly keepedActivties: Activity[];
}

export interface ArticleState {
  readonly featuredArticles: Article[];
  readonly articlePagination: ArticlePagination;
  readonly archivedArticles: Article[];
  readonly articleSearchResults: Article[];
}
