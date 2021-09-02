import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects/user.effects';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';
import { ProfileFieldsModule } from 'src/app/components/pages/profile/profile-fields/profile-fields.module';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EffectsModule.forFeature([UserEffects]),
    SignUpPageRoutingModule,
    ProfileFieldsModule,
    SharedModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
