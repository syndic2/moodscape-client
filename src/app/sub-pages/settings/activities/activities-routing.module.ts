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
    loadChildren: () => import('../../../pages/details/activity-category-detail/activity-category-detail.module').then(m => m.ActivityCategoryDetailPageModule)
  },
  {
    path: 'activity/:id',
    loadChildren: () => import('../../../pages/details/activity-detail/activity-detail.module').then(m => m.ActivityDetailPageModule)
  },
  {
    path: 'create-activity',
    loadChildren: () => import('../../activities/create-activity/create-activity.module').then(m => m.CreateActivityPageModule)
  },
  {
    path: 'create-activity-category',
    loadChildren: () => import('../../activities/create-activity-category/create-activity-category.module').then(m => m.CreateActivityCategoryPageModule)
  },
  {
    path: 'keeped',
    loadChildren: () => import('../../activities/keeped-activities/keeped-activities.module').then(m => m.KeepedActivitiesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitiesPageRoutingModule {}
