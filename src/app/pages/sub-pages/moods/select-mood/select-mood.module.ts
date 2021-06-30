import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { SelectMoodPageRoutingModule } from './select-mood-routing.module';
import { SelectMoodPage } from './select-mood.page';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaterialTimepickerModule,
    SelectMoodPageRoutingModule,
    CalendarPageModule,
    SelectEmoticonModule,
    SharedPipeModule
  ],
  declarations: [SelectMoodPage]
})
export class SelectMoodPageModule {}
