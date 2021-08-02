import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { StoreFeatureKeys } from 'src/app/store/feature-keys'
import { habitsReducer } from 'src/app/store/reducers/habits.reducer';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { HabitFieldsComponent } from './habit-fields.component';
import { SelectDayHorizontalListModule } from 'src/app/components/utilities/select-day-horizontal-list/select-day-horizontal-list.module';
import { SelectHabitLabelColorModule } from 'src/app/components/utilities/select-habit-label-color/select-habit-label-color.module';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [HabitFieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.HabitsState, habitsReducer),
    NgxMaterialTimepickerModule,
    SelectDayHorizontalListModule,
    SelectHabitLabelColorModule,
    CalendarPageModule,
    SharedPipeModule
  ],
  exports: [HabitFieldsComponent]
})
export class HabitFieldsModule { }
