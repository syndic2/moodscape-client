import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMoodPage } from './search-mood.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMoodPageRoutingModule {}
