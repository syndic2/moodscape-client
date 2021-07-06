import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoodsPage } from './moods.page';

const routes: Routes = [
  {
    path: '',
    component: MoodsPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('../../../details/mood-detail/mood-detail.module').then(m => m.MoodDetailPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../../../sub-pages/moods/search-mood/search-mood.module').then(m => m.SearchMoodPageModule)
  },
  {
    path: 'select-mood',
    loadChildren: () => import('../../../sub-pages/moods/select-mood/select-mood.module').then(m => m.SelectMoodPageModule)
  },
  {
    path: 'create-mood',
    loadChildren: () => import('../../../sub-pages/moods/create-detail-mood/create-detail-mood.module').then(m => m.CreateDetailMoodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoodsPageRoutingModule {}
