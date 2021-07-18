import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MDQTestPage } from './mdq-test.page';

const routes: Routes = [
  {
    path: '',
    component: MDQTestPage
  },
  {
    path: 'questions',
    loadChildren: () => import('../../sub-pages/mdq-test/mdq-questions/mdq-questions.module').then(m => m.MDQQuestionsPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('../../sub-pages/mdq-test/mdq-result/mdq-result.module').then(m => m.MDQResultPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MDQTestPageRoutingModule {}
