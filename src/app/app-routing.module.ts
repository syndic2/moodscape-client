import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { routes as AutoLoginRoutes } from './routes/auto-login.route';
import { routes as AuthenticatedRoutes } from './routes/authenticated.route';
import { routes as SettingsRoutes } from './routes/settings.route';

const routes: Routes = [
  ...AutoLoginRoutes,
  ...AuthenticatedRoutes,
  ...SettingsRoutes,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'articles',
    loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesPageModule)
  },
  {
    path: 'request-reset-password',
    loadChildren: () => import('./pages/finishes/request-reset-password/request-reset-password.module').then( m => m.RequestResetPasswordPageModule)
  },
  {
    path: 'reset-password/:resetToken',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/fallbacks/page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
