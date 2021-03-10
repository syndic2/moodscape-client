import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyArticlesPage } from './my-articles.page';

const routes: Routes = [
  {
    path: '',
    component: MyArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyArticlesPageRoutingModule {}
