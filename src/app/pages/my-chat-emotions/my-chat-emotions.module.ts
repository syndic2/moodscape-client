import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyChatEmotionsPageRoutingModule } from './my-chat-emotions-routing.module';
import { MyChatEmotionsPage } from './my-chat-emotions.page';
import { InputPhoneNumberPageModule } from 'src/app/modals/one-time-password/input-phone-number/input-phone-number.module';
import { InputOTPCodePageModule } from 'src/app/modals/one-time-password/input-otp-code/input-otp-code.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyChatEmotionsPageRoutingModule,
    InputPhoneNumberPageModule,
    InputOTPCodePageModule
  ],
  declarations: [MyChatEmotionsPage]
})
export class MyChatEmotionsPageModule {}
