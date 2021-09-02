import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, exhaustMap, concatMap, mergeMap } from 'rxjs/operators';

import { ArticleService } from 'src/app/services/article/article.service';
import { showToast, showAlert } from '../actions/application.actions';
import { 
  fetchArticles,
<<<<<<< HEAD
  fetchFeaturedArticles,
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  fetchMoreArticles, 
  fetchArchivedArticles, 
  fetchArticleByUrlName,
  fetchSearchArticle,
  fetchArchiveArticles,
  fetchSearchArchivedArticles,
  fetchRemoveArchivedArticles,

  setArticles,
<<<<<<< HEAD
  setFeaturedArticles,
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  setArchivedArticles,
  setMoreArticles,
  setArticleSearchResults,
  setArticle,
  archiveArticles,
  removeArchivedArticlesConfirmation,
  removeArchivedArticles 
} from '../actions/article.actions';

@Injectable()
export class ArticleEffects {
  getArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchArticles),
    exhaustMap(({ offset, limit }) => this.articleService.getArticles(offset, limit).pipe(
      map(res => setArticles({ articlePagination: res }))
    ))
  ));
<<<<<<< HEAD
  
  getFeaturedArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchFeaturedArticles),
    exhaustMap(() => this.articleService.getArticles().pipe(
      map(res => setFeaturedArticles({ articles: res.articles }))
    ))
  ));
  
=======
      
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  getMoreArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchMoreArticles),
    exhaustMap(({ offset, limit }) => this.articleService.getArticles(offset, limit).pipe(
      map(res => setMoreArticles({ articlePagination: res }))
    ))
  ));

  getArchivedArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchArchivedArticles),
    exhaustMap(() => this.articleService.getArchivedArticles().pipe(
      map(res => setArchivedArticles({ articles: res.articles }))
    ))
  ));

  getArticleByUrlName$= createEffect(() => this.actions$.pipe(
    ofType(fetchArticleByUrlName),
    exhaustMap(({ urlName }) => this.articleService.getArticleByUrlName(urlName).pipe(
      map(res => setArticle({ article: res }))
    ))
  ));

  searchArticle$= createEffect(() => this.actions$.pipe(
    ofType(fetchSearchArticle),
    exhaustMap(({ fields }) => this.articleService.searchArticle(fields).pipe(
      map(res => setArticleSearchResults({ articles: res }))
    ))
  ));

  searchArchivedArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchSearchArchivedArticles),
    exhaustMap(({ fields }) => this.articleService.searchArchivedArticles(fields).pipe(
      map(res => setArticleSearchResults({ articles: res }))
    ))
  ));

  archiveArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchArchiveArticles),
    concatMap(({ articleIds }) => this.articleService.archiveArticles(articleIds).pipe(
      switchMap(res => [
        archiveArticles({ articles: res.archivedArticles }),
        showToast({ 
          options: {
            message: res.response.text,
            position: 'top',
            duration: 1500
          }
        })
      ])
    ))
  ));

  removeArchivedArticlesConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeArchivedArticlesConfirmation),
    map(({ articleIds }) => showAlert({ 
      options: {
        message: 'Apakah anda ingin menghapus artikel ini?', 
        buttons: [
          {
            text: 'Tetap Simpan',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: () => {
              this.store.dispatch(fetchRemoveArchivedArticles({ articleIds: articleIds }))
            }
          }
        ] 
        } 
    }))
  ));

  removeArchivedArticles$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveArchivedArticles),
    mergeMap(({ articleIds }) => this.articleService.removeArchivedArticles(articleIds).pipe(
      map(res => removeArchivedArticles({ articleIds: res.removedArticles }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private articleService: ArticleService) { }
};