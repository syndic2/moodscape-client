import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SelectCalendarYearPage } from './select-calendar-year.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [SelectCalendarYearPage]
})
export class SelectCalendarYearPageModule {
  static getComponent(): typeof SelectCalendarYearPage {
    return SelectCalendarYearPage;
  }
}
