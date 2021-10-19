import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HabitStatisticsComponent } from './habit-statistics.component';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { SelectCalendarYearPageModule } from 'src/app/modals/select-calendar-year/select-calendar-year.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [HabitStatisticsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    CalendarPageModule,
    SelectCalendarYearPageModule,
    SharedPipeModule
  ],
  exports: [HabitStatisticsComponent]
})
export class HabitStatisticsModule { }
