import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'
;
import { StoreModule } from '@ngrx/store';

import { CreateDetailMoodPageRoutingModule } from './create-detail-mood-routing.module';
import { CreateDetailMoodPage } from './create-detail-mood.page';
import { SelectActivitiesModule } from 'src/app/components/utilities/select-activities/select-activities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDetailMoodPageRoutingModule,
    SelectActivitiesModule
  ],
  declarations: [CreateDetailMoodPage]
})
export class CreateDetailMoodPageModule {}
