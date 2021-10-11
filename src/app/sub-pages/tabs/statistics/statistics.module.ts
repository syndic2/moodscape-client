import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { MoodEffects } from 'src/app/store/effects/mood.effects';
import { HabitEffects } from 'src/app/store/effects/habit.effects';

import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './statistics.page';
import { MoodStatisticsModule } from 'src/app/components/pages/statistics/mood-statistics/mood-statistics.module';
import { HabitStatisticsModule } from 'src/app/components/pages/statistics/habit-statistics/habit-statistics.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([MoodEffects, HabitEffects]),
    StatisticsPageRoutingModule,
    MoodStatisticsModule,
    HabitStatisticsModule
  ],
  declarations: [StatisticsPage]
})
export class StatisticsPageModule {}
