import { Routes } from "@angular/router";

import { AutoLoginGuard } from "src/app/guards/auto-login/auto-login.guard";

export const routes: Routes= [
  {
    path: 'sign-in',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('../pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('../pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('../pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
];
