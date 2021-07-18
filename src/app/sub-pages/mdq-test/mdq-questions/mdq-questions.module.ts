import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MDQQuestionsPageRoutingModule } from './mdq-questions-routing.module';
import { MDQQuestionsPage } from './mdq-questions.page';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDQQuestionsPageRoutingModule,
    SharedPipeModule
  ],
  declarations: [MDQQuestionsPage]
})
export class MDQQuestionsPageModule {}
