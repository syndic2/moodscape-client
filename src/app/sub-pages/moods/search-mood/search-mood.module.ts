import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { MoodEffects } from 'src/app/store/effects/mood.effects';

import { SearchMoodPageRoutingModule } from './search-mood-routing.module';
import { SearchMoodPage } from './search-mood.page';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';
// import { SelectActivitiesModule } from 'src/app/components/utilities/select-activities/select-activities.module';
import { SelectDateModule } from 'src/app/components/utilities/select-date/select-date.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([MoodEffects]),
    SearchMoodPageRoutingModule,
    SelectEmoticonModule,
    // SelectActivitiesModule,
    SelectDateModule
  ],
  declarations: [SearchMoodPage]
})
export class SearchMoodPageModule { }
