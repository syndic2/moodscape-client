import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EffectsModule } from '@ngrx/effects';
import { HabitEffects } from 'src/app/store/effects/habit.effects';

import { HabitsPageRoutingModule } from './habits-routing.module';
import { HabitsPage } from './habits.page';
import { HabitListItemModule } from 'src/app/components/pages/habits/habit-list-item/habit-list-item.module';
import { HabitListLoaderModule } from 'src/app/components/pages/habits/habit-list-loader/habit-list-loader.module';
import { SelectDayHorizontalListModule } from 'src/app/components/utilities/select-day-horizontal-list/select-day-horizontal-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    EffectsModule.forFeature([HabitEffects]),
    HabitsPageRoutingModule,
    HabitListItemModule,
    HabitListLoaderModule,
    SelectDayHorizontalListModule
  ],
  declarations: [HabitsPage]
})
export class HabitsPageModule {}
