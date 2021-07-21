import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchHabitPageRoutingModule } from './search-habit-routing.module';

import { SearchHabitPage } from './search-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchHabitPageRoutingModule
  ],
  declarations: [SearchHabitPage]
})
export class SearchHabitPageModule {}
