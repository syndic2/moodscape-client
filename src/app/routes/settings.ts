import { Routes } from "@angular/router";

export const routes: Routes= [
  {
    path: 'settings/activities',
    loadChildren: () => import('../pages/sub-pages/settings/activities/activities.module').then(m => m.ActivitiesPageModule)
  },
  {
    path: 'settings/notifications',
    loadChildren: () => import('../pages/sub-pages/settings/notifications/notifications.module').then(m => m.NotificationsPageModule),
  },
  {
    path: 'settings/themes',
    loadChildren: () => import('../pages/sub-pages/settings/themes/themes.module').then(m => m.ThemesPageModule)
  },
  {
    path: 'settings/change-password',
    loadChildren: () => import('../pages/sub-pages/settings/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'settings/feedback',
    loadChildren: () => import('../pages/sub-pages/settings/app-feedback/app-feedback.module').then(m => m.AppFeedbackPageModule)
  },
];
