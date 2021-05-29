import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityCategoryDetailPage } from './activity-category-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityCategoryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityCategoryDetailPageRoutingModule {}
