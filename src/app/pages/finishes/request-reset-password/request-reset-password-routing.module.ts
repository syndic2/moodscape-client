import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestResetPasswordPage } from './request-reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: RequestResetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestResetPasswordPageRoutingModule {}
