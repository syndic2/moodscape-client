import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateHabitPage } from './create-habit.page';

const routes: Routes = [
  {
    path: '',
    component: CreateHabitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHabitPageRoutingModule {}
