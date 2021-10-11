import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitListByDatePageRoutingModule } from './habit-list-by-date-routing.module';
import { HabitListByDatePage } from './habit-list-by-date.page';
import { HabitListItemModule } from 'src/app/components/pages/habits/habit-list-item/habit-list-item.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitListByDatePageRoutingModule,
    HabitListItemModule,
    SharedPipeModule
  ],
  declarations: [HabitListByDatePage]
})
export class HabitListByDatePageModule {}
