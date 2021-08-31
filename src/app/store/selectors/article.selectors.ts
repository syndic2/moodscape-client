import { createSelector, createFeatureSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { ArticleState } from '../states';

export const selectArticleFeature= createFeatureSelector<ArticleState>(StoreFeatureKeys.ARTICLE);

export const getArticlePagination= createSelector(
  selectArticleFeature,
  state => state.articlePagination
);

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