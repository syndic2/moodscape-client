import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeepedActivitiesPage } from './keeped-activities.page';

const routes: Routes = [
  {
    path: '',
    component: KeepedActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeepedActivitiesPageRoutingModule {}
