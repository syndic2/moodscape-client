import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitListByDatePage } from './habit-list-by-date.page';

const routes: Routes = [
  {
    path: '',
    component: HabitListByDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitListByDatePageRoutingModule {}
