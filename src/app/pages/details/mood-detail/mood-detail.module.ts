import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
<<<<<<< HEAD
=======

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { moodReducer } from 'src/app/store/reducers/mood.reducer';
import { MoodEffects } from 'src/app/store/effects/mood.effects';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

import { EffectsModule } from '@ngrx/effects';
import { MoodEffects } from 'src/app/store/effects/mood.effects';

import { MoodDetailPageRoutingModule } from './mood-detail-routing.module';
import { MoodDetailPage } from './mood-detail.page';
import { MoodFieldsLoaderComponent } from 'src/app/components/pages/moods/mood-fields-loader/mood-fields-loader.component';
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
    FontAwesomeModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.MOOD, moodReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    EffectsModule.forFeature([MoodEffects]),
    MoodDetailPageRoutingModule,
    SelectDateModule,
    SelectTimeModule,
    SelectEmoticonModule,
    SelectActivitiesModule,
    SharedPipeModule
  ],
  declarations: [
    MoodDetailPage,
    MoodFieldsLoaderComponent
  ]
})
export class MoodDetailPageModule {}
