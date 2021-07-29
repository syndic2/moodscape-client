import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { CreateHabitPageRoutingModule } from './create-habit-routing.module';
import { CreateHabitPage } from './create-habit.page';
import { SelectDayHorizontalListModule } from 'src/app/components/utilities/select-day-horizontal-list/select-day-horizontal-list.module';
import { SelectHabitLabelColorModule } from 'src/app/components/utilities/select-habit-label-color/select-habit-label-color.module';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMaterialTimepickerModule,
    CreateHabitPageRoutingModule,
    SelectDayHorizontalListModule,
    SelectHabitLabelColorModule,
    CalendarPageModule,
    SharedPipeModule
  ],
  declarations: [CreateHabitPage]
})
export class CreateHabitPageModule {}
