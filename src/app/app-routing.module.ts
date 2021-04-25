import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AutoLoginGuard } from './guards/auto-login/auto-login.guard';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'side-menu',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('./pages/side-menu/side-menu.module').then(m => m.SideMenuModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./pages/articles/articles.module').then( m => m.ArticlesPageModule)
  },  {
    path: 'article-detail',
    loadChildren: () => import('./pages/details/article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
