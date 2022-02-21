import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { StoreFeatureKeys } from 'src/app/store/feature-keys'
import { habitReducer } from 'src/app/store/reducers/habit.reducer';
import { HabitEffects } from 'src/app/store/effects/habit.effects';
import { HabitFieldsComponent } from './habit-fields.component';
import { SelectDayHorizontalListModule } from 'src/app/components/utilities/select-day-horizontal-list/select-day-horizontal-list.module';
import { SelectHabitLabelColorModule } from 'src/app/components/utilities/select-habit-label-color/select-habit-label-color.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [HabitFieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.HABIT, habitReducer),
    EffectsModule.forFeature([HabitEffects]),
    NgxMaterialTimepickerModule,
    SelectDayHorizontalListModule,
    SelectHabitLabelColorModule,
    SharedPipeModule
  ],
  exports: [HabitFieldsComponent]
})
export class HabitFieldsModule { }
