import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitListLoaderComponent } from './habit-list-loader.component';

@NgModule({
  declarations: [HabitListLoaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HabitListLoaderComponent]
})
export class HabitListLoaderModule { }
