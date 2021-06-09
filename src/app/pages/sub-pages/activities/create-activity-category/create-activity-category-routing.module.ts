import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateActivityCategoryPage } from './create-activity-category.page';

const routes: Routes = [
  {
    path: '',
    component: CreateActivityCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateActivityCategoryPageRoutingModule {}
