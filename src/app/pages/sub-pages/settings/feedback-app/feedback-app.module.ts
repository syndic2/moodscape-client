import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackAppPageRoutingModule } from './feedback-app-routing.module';

import { FeedbackAppPage } from './feedback-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackAppPageRoutingModule
  ],
  declarations: [FeedbackAppPage]
})
export class FeedbackAppPageModule {}
