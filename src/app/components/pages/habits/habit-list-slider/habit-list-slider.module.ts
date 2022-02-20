import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';

import { HabitListSliderComponent } from './habit-list-slider.component';
import { HabitListItemModule } from '../habit-list-item/habit-list-item.module';

@NgModule({
  declarations: [HabitListSliderComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    IonicModule,
    HabitListItemModule
  ],
  exports: [HabitListSliderComponent]
})
export class HabitListSliderModule { }
