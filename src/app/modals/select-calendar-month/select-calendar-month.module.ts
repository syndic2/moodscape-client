import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SelectCalendarMonthPage } from './select-calendar-month.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [SelectCalendarMonthPage]
})
export class SelectCalendarMonthPageModule {
  static getComponent(): typeof SelectCalendarMonthPage {
    return SelectCalendarMonthPage;
  }
}
