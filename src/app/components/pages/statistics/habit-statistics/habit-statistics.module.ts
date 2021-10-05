import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitStatisticsComponent } from './habit-statistics.component';

@NgModule({
  declarations: [HabitStatisticsComponent],
  imports: [
    CommonModule
  ],
  exports: [HabitStatisticsComponent]
})
export class HabitStatisticsModule { }
