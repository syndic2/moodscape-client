import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHabitPageRoutingModule } from './create-habit-routing.module';
import { CreateHabitPage } from './create-habit.page';
import { HabitFieldsModule } from 'src/app/components/pages/habits/habit-fields/habit-fields.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHabitPageRoutingModule,
    HabitFieldsModule
  ],
  declarations: [CreateHabitPage]
})
export class CreateHabitPageModule {}
