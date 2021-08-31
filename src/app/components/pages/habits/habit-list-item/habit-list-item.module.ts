import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HabitListItemComponent } from './habit-list-item.component';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [HabitListItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [HabitListItemComponent]
})
export class HabitListItemModule { }
