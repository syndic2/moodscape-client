import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitTracksHistoryPage } from './habit-tracks-history.page';

const routes: Routes = [
  {
    path: '',
    component: HabitTracksHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitTracksHistoryPageRoutingModule {}
