import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitiesPage } from './activities.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesPage
  },
  {
    path: 'activity-category/:id',
    loadChildren: () => import('../../../details/activity-category-detail/activity-category-detail.module').then(m => m.ActivityCategoryDetailPageModule)
  },
  {
    path: 'activity/:id',
    loadChildren: () => import('../../../details/activity-detail/activity-detail.module').then(m => m.ActivityDetailPageModule)
  },
  {
    path: 'keeped',
    loadChildren: () => import('../../../sub-pages/activities/keeped-activities/keeped-activities.module').then(m => m.KeepedActivitiesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesPageRoutingModule {}
