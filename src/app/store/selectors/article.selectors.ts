import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ArticleState } from '../states';

const selectArticleFeature = createFeatureSelector<ArticleState>(StoreFeatureKeys.ARTICLE);

export const getArticlePagination = createSelector(
  selectArticleFeature,
  state => state.articlePagination
);

export const getFeaturedArticles = createSelector(
  selectArticleFeature,
  state => state.featuredArticles
);

export const getArchivedArticles = createSelector(
  selectArticleFeature,
  state => state.archivedArticles
);

export const getArticleByUrlName = (urlName: string) => {
  return createSelector(
    getArticlePagination,
    state => state.articles.find(article => article.urlName === urlName)
  );
};

export const getArticleSearchResults = createSelector(
  selectArticleFeature,
  state => state.articleSearchResults
);
