import { Routes } from "@angular/router";

import { AuthenticationGuard } from "../guards/authentication/authentication.guard";

export const routes: Routes= [
  {
    path: 'side-menu',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/side-menu/side-menu.module').then(m => m.SideMenuModule)
  }
]
