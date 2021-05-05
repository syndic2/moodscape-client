import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackAppPage } from './feedback-app.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackAppPageRoutingModule {}
