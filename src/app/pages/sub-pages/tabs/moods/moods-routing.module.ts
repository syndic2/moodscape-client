import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoodsPage } from './moods.page';

const routes: Routes = [
  {
    path: '',
    component: MoodsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoodsPageRoutingModule {}
