import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDetailMoodPage } from './create-detail-mood.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDetailMoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDetailMoodPageRoutingModule {}
