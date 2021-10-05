import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MoodStatisticsComponent } from './mood-statistics.component';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { MoodsCountModule } from '../../moods/moods-count/moods-count.module';
import { SelectCalendarMonthPageModule } from 'src/app/modals/select-calendar-month/select-calendar-month.module';
import { SelectCalendarYearPageModule } from 'src/app/modals/select-calendar-year/select-calendar-year.module';

@NgModule({
  declarations: [MoodStatisticsComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarPageModule,
    MoodsCountModule,
    SelectCalendarMonthPageModule,
    SelectCalendarYearPageModule
  ],
  exports: [MoodStatisticsComponent]
})
export class MoodStatisticsModule { }
