import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitStatisticsComponent } from './habit-statistics.component';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';

@NgModule({
  declarations: [HabitStatisticsComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarPageModule
  ],
  exports: [HabitStatisticsComponent]
})
export class HabitStatisticsModule { }
