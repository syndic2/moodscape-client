import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsArticlePage } from './search-results-article.page';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsArticlePageRoutingModule {}
