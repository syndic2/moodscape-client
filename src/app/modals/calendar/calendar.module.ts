import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCalendarModule } from 'ionic2-calendar';

import { CalendarPage } from './calendar.page';
import { SelectCalendarMonthPageModule } from '../select-calendar-month/select-calendar-month.module';
import { SelectCalendarYearPageModule } from '../select-calendar-year/select-calendar-year.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';
registerLocaleData(localeId);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    SelectCalendarMonthPageModule,
    SelectCalendarYearPageModule,
    SharedPipeModule
  ],
  exports: [CalendarPage],
  declarations: [CalendarPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'id-ID' }
  ]
})
export class CalendarPageModule {}
