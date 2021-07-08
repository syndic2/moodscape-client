import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userMoodsReducer } from 'src/app/store/reducers/user-moods.reducer';

import { CreateDetailMoodPageRoutingModule } from './create-detail-mood-routing.module';
import { CreateDetailMoodPage } from './create-detail-mood.page';
import { SelectActivitiesModule } from 'src/app/components/utilities/select-activities/select-activities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.UserMoods, userMoodsReducer),
    CreateDetailMoodPageRoutingModule,
    SelectActivitiesModule
  ],
  declarations: [CreateDetailMoodPage]
})
export class CreateDetailMoodPageModule {}
