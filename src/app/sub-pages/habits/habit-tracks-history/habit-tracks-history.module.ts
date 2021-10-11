import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitTracksHistoryPageRoutingModule } from './habit-tracks-history-routing.module';
import { HabitTracksHistoryPage } from './habit-tracks-history.page';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitTracksHistoryPageRoutingModule,
    SharedPipeModule
  ],
  declarations: [HabitTracksHistoryPage]
})
export class HabitTracksHistoryPageModule {}
