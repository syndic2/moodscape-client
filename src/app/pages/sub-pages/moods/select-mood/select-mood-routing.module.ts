import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMoodPage } from './select-mood.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMoodPageRoutingModule {}
