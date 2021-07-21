import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitListItemComponent } from './habit-list-item.component';

@NgModule({
  declarations: [HabitListItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HabitListItemComponent]
})
export class HabitListItemModule { }
