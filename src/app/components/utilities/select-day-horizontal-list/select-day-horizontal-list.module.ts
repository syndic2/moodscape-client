import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SelectDayHorizontalListComponent } from './select-day-horizontal-list.component';

@NgModule({
  declarations: [SelectDayHorizontalListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SelectDayHorizontalListComponent]
})
export class SelectDayHorizontalListModule { }
