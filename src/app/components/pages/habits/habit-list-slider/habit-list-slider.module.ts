import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitListSliderComponent } from './habit-list-slider.component';
import { HabitListItemModule } from '../habit-list-item/habit-list-item.module';

@NgModule({
  declarations: [HabitListSliderComponent],
  imports: [
    CommonModule,
    IonicModule,
    HabitListItemModule
  ],
  exports: [HabitListSliderComponent]
})
export class HabitListSliderModule { }
