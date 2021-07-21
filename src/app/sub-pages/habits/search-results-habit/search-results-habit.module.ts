import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultsHabitPageRoutingModule } from './search-results-habit-routing.module';

import { SearchResultsHabitPage } from './search-results-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchResultsHabitPageRoutingModule
  ],
  declarations: [SearchResultsHabitPage]
})
export class SearchResultsHabitPageModule {}
