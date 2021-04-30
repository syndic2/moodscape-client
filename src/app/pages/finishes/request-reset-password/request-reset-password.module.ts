import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestResetPasswordPageRoutingModule } from './request-reset-password-routing.module';

import { RequestResetPasswordPage } from './request-reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestResetPasswordPageRoutingModule
  ],
  declarations: [RequestResetPasswordPage]
})
export class RequestResetPasswordPageModule {}
