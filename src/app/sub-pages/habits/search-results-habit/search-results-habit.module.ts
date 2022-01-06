import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultsHabitPageRoutingModule } from './search-results-habit-routing.module';
import { SearchResultsHabitPage } from './search-results-habit.page';
import { HabitListSliderModule } from 'src/app/components/pages/habits/habit-list-slider/habit-list-slider.module';
import { HabitListLoaderModule } from 'src/app/components/pages/habits/habit-list-loader/habit-list-loader.module';
import { HabitSearchFiltersComponent } from 'src/app/components/pages/habits/habit-search-filters/habit-search-filters.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultsHabitPageRoutingModule,
    HabitListSliderModule,
    HabitListLoaderModule
  ],
  declarations: [
    SearchResultsHabitPage,
    HabitSearchFiltersComponent
  ]
})
export class SearchResultsHabitPageModule { }
