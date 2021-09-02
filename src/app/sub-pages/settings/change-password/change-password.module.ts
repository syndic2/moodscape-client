import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects/user.effects';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { ChangePasswordPage } from './change-password.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EffectsModule.forFeature([UserEffects]),
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
