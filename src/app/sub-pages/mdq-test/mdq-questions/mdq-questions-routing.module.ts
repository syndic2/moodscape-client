import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MDQQuestionsPage } from './mdq-questions.page';

const routes: Routes = [
  {
    path: '',
    component: MDQQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MDQQuestionsPageRoutingModule {}
