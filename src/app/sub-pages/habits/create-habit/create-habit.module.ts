import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHabitPageRoutingModule } from './create-habit-routing.module';
import { CreateHabitPage } from './create-habit.page';
import { SelectDayHorizontalListModule } from 'src/app/components/utilities/select-day-horizontal-list/select-day-horizontal-list.module';
import { SelectHabitLabelColorModule } from 'src/app/components/utilities/select-habit-label-color/select-habit-label-color.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHabitPageRoutingModule,
    SelectDayHorizontalListModule,
    SelectHabitLabelColorModule
  ],
  declarations: [CreateHabitPage]
})
export class CreateHabitPageModule {}
