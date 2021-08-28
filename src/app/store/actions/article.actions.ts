import { createAction, props } from '@ngrx/store';

import { Article, ArticlePagination } from 'src/app/models/article.model';

//Fetch API
export const fetchArticles= createAction(
  '[Article/API] Get articles',
  props<{ offset?: number, limit?: number }>()
);

export const fetchMoreArticles= createAction(
  '[Article/API] Get for load more articles',
  props<{ offset?: number, limit?: number }>()
);

export const fetchArchivedArticles= createAction('[Article/API] Get archived articles')

export const fetchArticleByUrlName= createAction(
  '[Article/API] Get article by url name field',
  props<{ urlName: string }>()
);

export const fetchArchiveArticles= createAction(
  '[Article/API] Archive article',
  props<{ articleIds: number[] }>()
);

export const fetchSearchArticle= createAction(
  '[Article/API] Search article',
  props<{ fields: {} }>()
);

export const fetchSearchArchivedArticles= createAction(
  '[Article/API] Search archived article',
  props<{ fields: {} }>()
);

export const removeArchivedArticlesConfirmation= createAction(
  '[Article/API] Remove archived articles confirmation',
  props<{ articleIds: number[] }>()
);

export const fetchRemoveArchivedArticles= createAction(
  '[Article/API] Remove archived articles',
  props<{ articleIds: number[] }>()
); 

//STORE
export const setArticles= createAction(
  '[Article/STORE] Set articles with pagination',
  props<{ articlePagination: ArticlePagination }>()
);

export const setMoreArticles= createAction(
  '[Article/STORE] Set more articles',
  props<{ articlePagination: ArticlePagination }>()
);

export const setArchivedArticles= createAction(
  '[Article/STORE] Set user archived articles',
  props<{ articles: Article[] }>()
);

export const setArticle= createAction(
  '[Article/STORE] Set article',
  props<{ article: Article }>()
);

export const setArticleSearchResults= createAction(
  '[Article/STORE] Set article search results',
  props<{ articles: Article[] }>()
);

export const archiveArticles= createAction(
  '[Article/STORE] Archive article',
  props<{ articles: Article[] }>()
);

export const removeArchivedArticles= createAction(
  '[Article/STORE] Remove acrhived articles',
  props<{ articleIds: number[] }>()
);