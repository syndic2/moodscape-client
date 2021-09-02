import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { ArticleState } from '../states';
import { 
  setArticles, 
  setFeaturedArticles,
  setMoreArticles,
  setArchivedArticles, 
  setArticleSearchResults,
  setArticle, 
  archiveArticles, 
  removeArchivedArticles 
} from '../actions/article.actions';

const initialState: ArticleState= {
  featuredArticles: [],
  articlePagination: {
    articles: []
  },
  archivedArticles: [],
  articleSearchResults: []
};

export const articleReducer= createReducer(
  initialState,
  on(setArticles, (state, { articlePagination }) => ({ 
    ...state, 
    articlePagination: { 
      ...state.articlePagination, 
      ...articlePagination 
    }
  })),
  
  on(setFeaturedArticles, (state, { articles }) => ({ ...state, featuredArticles: [...articles] })),

  on(setMoreArticles, (state, { articlePagination }) => ({ 
    ...state,
    articlePagination: {
      ...state.articlePagination,
      offset: articlePagination.offset,
      limit: articlePagination.limit,
      maxPage: articlePagination.maxPage,
      articles: [...state.articlePagination.articles, ...articlePagination.articles],
    } 
  })),

  on(setArchivedArticles, (state, { articles }) => ({ ...state, archivedArticles: [...articles] })),

  on(setArticle, (state, { article }) => ({ 
    ...state,
    articlePagination: {
      ...state.articlePagination,
      articles: [
        ...state.articlePagination.articles.map(object => {
          if (object.Id !== article.Id) {
            return object;
          }

          return article;
        })
      ]
    }
  })),

  on(setArticleSearchResults, (state, { articles }) => ({
    ...state,
    articleSearchResults: [...articles]
  })),

  on(archiveArticles, (state, { articles }) => ({ ...state, archivedArticles: [...state.archivedArticles, ...articles] })),

  on(removeArchivedArticles, (state, { articleIds }) => ({
    ...state,
    archivedArticles: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.archivedArticles },
        { type: 'none-object', items: articleIds },
        { field1: 'Id' }
      )
    ]
  }))
);