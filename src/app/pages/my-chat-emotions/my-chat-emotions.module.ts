import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyChatEmotionsPageRoutingModule } from './my-chat-emotions-routing.module';
import { MyChatEmotionsPage } from './my-chat-emotions.page';
import { InputPhoneNumberPageModule } from 'src/app/modals/one-time-password/input-phone-number/input-phone-number.module';
import { InputOTPCodePageModule } from 'src/app/modals/one-time-password/input-otp-code/input-otp-code.module';
import { AccordionV2Module } from 'src/app/components/widgets/accordion-v2/accordion-v2.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyChatEmotionsPageRoutingModule,
    InputPhoneNumberPageModule,
    InputOTPCodePageModule,
    AccordionV2Module,
    SharedPipeModule
  ],
  declarations: [MyChatEmotionsPage]
})
export class MyChatEmotionsPageModule { }
