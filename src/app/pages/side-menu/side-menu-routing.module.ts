import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs'
  },
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../sub-pages/side-menu/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'my-articles',
        loadChildren: () => import('../sub-pages/side-menu/my-articles/my-articles.module').then( m => m.MyArticlesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../sub-pages/side-menu/settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
