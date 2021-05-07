import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../sub-pages/tabs/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'moods',
        loadChildren: () => import('../sub-pages/tabs/moods/moods.module').then(m => m.MoodsPageModule)
      },
      {
        path: 'habits',
        loadChildren: () => import('../sub-pages/tabs/habits/habits.module').then(m => m.HabitsPageModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('../sub-pages/tabs/statistics/statistics.module').then(m => m.StatisticsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
