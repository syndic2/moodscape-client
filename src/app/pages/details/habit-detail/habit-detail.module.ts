import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD
import { EffectsModule } from '@ngrx/effects';
=======
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { habitReducer } from 'src/app/store/reducers/habit.reducer';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { HabitEffects } from 'src/app/store/effects/habit.effects';

import { HabitDetailPageRoutingModule } from './habit-detail-routing.module';
import { HabitDetailPage } from './habit-detail.page';
import { HabitFieldsModule } from 'src/app/components/pages/habits/habit-fields/habit-fields.module';
import { HabitFieldsLoaderComponent } from 'src/app/components/pages/habits/habit-fields-loader/habit-fields-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.HABIT, habitReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    EffectsModule.forFeature([HabitEffects]),
    HabitDetailPageRoutingModule,
    HabitFieldsModule
  ],
  declarations: [
    HabitDetailPage, 
    HabitFieldsLoaderComponent
  ]
})
export class HabitDetailPageModule {}
