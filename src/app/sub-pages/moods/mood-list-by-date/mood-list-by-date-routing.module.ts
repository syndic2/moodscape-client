import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoodListByDatePage } from './mood-list-by-date.page';

const routes: Routes = [
  {
    path: '',
    component: MoodListByDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoodListByDatePageRoutingModule {}
