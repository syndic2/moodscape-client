import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/modules/shared.module';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
