import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitDetailPageRoutingModule } from './habit-detail-routing.module';
import { HabitDetailPage } from './habit-detail.page';
import { HabitFieldsModule } from 'src/app/components/pages/habits/habit-fields/habit-fields.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitDetailPageRoutingModule,
    HabitFieldsModule
  ],
  declarations: [HabitDetailPage]
})
export class HabitDetailPageModule {}
