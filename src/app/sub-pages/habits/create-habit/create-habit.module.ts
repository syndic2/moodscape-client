import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHabitPageRoutingModule } from './create-habit-routing.module';

import { CreateHabitPage } from './create-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHabitPageRoutingModule
  ],
  declarations: [CreateHabitPage]
})
export class CreateHabitPageModule {}
