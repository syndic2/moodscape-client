import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { HabitEffects } from 'src/app/store/effects/habit.effects';

import { SearchHabitPageRoutingModule } from './search-habit-routing.module';
import { SearchHabitPage } from './search-habit.page';
import { SelectDateModule } from 'src/app/components/utilities/select-date/select-date.module';
import { SelectTimeModule } from 'src/app/components/utilities/select-time/select-time.module';
import { SelectHabitLabelColorModule } from 'src/app/components/utilities/select-habit-label-color/select-habit-label-color.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([HabitEffects]),
    SearchHabitPageRoutingModule,
    SelectDateModule,
    SelectTimeModule,
    SelectHabitLabelColorModule
  ],
  declarations: [SearchHabitPage]
})
export class SearchHabitPageModule { }
