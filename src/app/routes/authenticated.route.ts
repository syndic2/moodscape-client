import { Routes } from "@angular/router";

import { AuthenticationGuard } from "../guards/authentication/authentication.guard";

export const routes: Routes= [
  {
    path: 'side-menu',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/side-menu/side-menu.module').then(m => m.SideMenuModule)
  },
  {
    path: 'moods/search',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/sub-pages/moods/search-mood/search-mood.module').then(m => m.SearchMoodPageModule)
  },
  {
    path: 'moods/search-results',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/sub-pages/moods/search-results-mood/search-results-mood.module').then(m => m.SearchResultsMoodPageModule)
  },
  {
    path: 'moods/create/step-1',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/sub-pages/moods/select-mood/select-mood.module').then(m => m.SelectMoodPageModule)
  },
  {
    path: 'moods/create/step-2',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/sub-pages/moods/create-detail-mood/create-detail-mood.module').then(m => m.CreateDetailMoodPageModule)
  },
  {
    path: 'moods/:id',
    canLoad: [AuthenticationGuard],
    loadChildren: () => import('../pages/details/mood-detail/mood-detail.module').then(m => m.MoodDetailPageModule)
  }
]
