import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppFeedbackPageRoutingModule } from './app-feedback-routing.module';
import { AppFeedbackPage } from './app-feedback.page';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AppFeedbackPageRoutingModule,
    SelectEmoticonModule
  ],
  declarations: [AppFeedbackPage]
})
export class AppFeedbackPageModule {}
