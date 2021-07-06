import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoodDetailPageRoutingModule } from './mood-detail-routing.module';
import { MoodDetailPage } from './mood-detail.page';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodDetailPageRoutingModule,
    CalendarPageModule,
    SharedPipeModule
  ],
  declarations: [MoodDetailPage]
})
export class MoodDetailPageModule {}
