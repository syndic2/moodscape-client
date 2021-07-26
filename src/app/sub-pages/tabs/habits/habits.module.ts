import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { habitsReducer } from 'src/app/store/reducers/habits.reducer';

import { HabitsPageRoutingModule } from './habits-routing.module';
import { HabitsPage } from './habits.page';
import { HabitListItemModule } from 'src/app/components/pages/habits/habit-list-item/habit-list-item.module';
import { HabitListLoaderModule } from 'src/app/components/pages/habits/habit-list-loader/habit-list-loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.HabitsState, habitsReducer),
    HabitsPageRoutingModule,
    HabitListItemModule,
    HabitListLoaderModule
  ],
  declarations: [HabitsPage]
})
export class HabitsPageModule {}
