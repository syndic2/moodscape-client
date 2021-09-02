import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ArticleState } from '../states';

<<<<<<< HEAD
const selectArticleFeature= createFeatureSelector<ArticleState>(StoreFeatureKeys.ARTICLE);
=======
export const selectArticleFeature= createFeatureSelector<ArticleState>(StoreFeatureKeys.ARTICLE);
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

export const getArticlePagination= createSelector(
  selectArticleFeature,
  state => state.articlePagination
);

<<<<<<< HEAD
export const getFeaturedArticles= createSelector(
  selectArticleFeature,
  state => state.featuredArticles
);

=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
export const getArchivedArticles= createSelector(
  selectArticleFeature,
  state => state.archivedArticles
);

export const getArticleByUrlName= (urlName: string) => {
  return createSelector(
    getArticlePagination,
    state => state.articles.find(article => article.urlName === urlName)
  );
};

export const getArticleSearchResults= createSelector(
  selectArticleFeature,
  state => state.articleSearchResults
);