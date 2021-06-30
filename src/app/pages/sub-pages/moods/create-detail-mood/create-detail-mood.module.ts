import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDetailMoodPageRoutingModule } from './create-detail-mood-routing.module';

import { CreateDetailMoodPage } from './create-detail-mood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDetailMoodPageRoutingModule
  ],
  declarations: [CreateDetailMoodPage]
})
export class CreateDetailMoodPageModule {}
