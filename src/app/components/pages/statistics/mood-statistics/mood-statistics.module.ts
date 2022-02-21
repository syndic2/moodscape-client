import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MoodStatisticsComponent } from './mood-statistics.component';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { MoodsCountModule } from '../../moods/moods-count/moods-count.module';

@NgModule({
  declarations: [MoodStatisticsComponent],
  imports: [
    CommonModule,
    IonicModule,
    CalendarPageModule,
    MoodsCountModule
  ],
  exports: [MoodStatisticsComponent]
})
export class MoodStatisticsModule { }
