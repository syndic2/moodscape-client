import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userMoodsReducer } from 'src/app/store/reducers/user-moods.reducer';

import { MoodDetailPageRoutingModule } from './mood-detail-routing.module';
import { MoodDetailPage } from './mood-detail.page';
import { SelectDateModule } from 'src/app/components/utilities/select-date/select-date.module';
import { SelectTimeModule } from 'src/app/components/utilities/select-time/select-time.module';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';
import { SelectActivitiesModule } from 'src/app/components/utilities/select-activities/select-activities.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.MoodModule, userMoodsReducer),
    FontAwesomeModule,
    MoodDetailPageRoutingModule,
    SelectDateModule,
    SelectTimeModule,
    SelectEmoticonModule,
    SelectActivitiesModule,
    SharedPipeModule
  ],
  declarations: [MoodDetailPage]
})
export class MoodDetailPageModule {}
