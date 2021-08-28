import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesPage } from './articles.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesPage,
  },
  {
    path: 'search',
    loadChildren: () => import('../../sub-pages/articles/search-article/search-article.module').then(m => m.SearchArticlePageModule),
  },
  {
    path: 'search-results',
    loadChildren: () => import('../../sub-pages/articles/search-results-article/search-results-article.module').then(m => m.SearchResultsArticlePageModule)
  },
  {
    path: ':urlName',
    loadChildren: () => import('../details/article-detail/article-detail.module').then(m => m.ArticleDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesPageRoutingModule {}
