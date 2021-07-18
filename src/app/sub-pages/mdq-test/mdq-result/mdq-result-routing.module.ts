import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MDQResultPage } from './mdq-result.page';

const routes: Routes = [
  {
    path: '',
    component: MDQResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MDQResultPageRoutingModule {}
