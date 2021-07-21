import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsHabitPage } from './search-results-habit.page';

const routes: Routes = [
  {
    path: '',
    component: SearchResultsHabitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchResultsHabitPageRoutingModule {}
