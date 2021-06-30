import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/modules/shared.module';
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';
import { ProfileFieldsModule } from 'src/app/components/pages/profile/profile-fields/profile-fields.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SignUpPageRoutingModule,
    ProfileFieldsModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {}
