import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SelectHabitLabelColorComponent } from './select-habit-label-color.component';

@NgModule({
  declarations: [SelectHabitLabelColorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SelectHabitLabelColorComponent]
})
export class SelectHabitLabelColorModule { }
