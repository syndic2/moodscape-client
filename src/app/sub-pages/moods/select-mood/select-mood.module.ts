import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMoodPageRoutingModule } from './select-mood-routing.module';
import { SelectMoodPage } from './select-mood.page';
import { SelectDateModule } from 'src/app/components/utilities/select-date/select-date.module';
import { SelectTimeModule } from 'src/app/components/utilities/select-time/select-time.module';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMoodPageRoutingModule,
    SelectDateModule,
    SelectTimeModule,
    SelectEmoticonModule
  ],
  declarations: [SelectMoodPage]
})
export class SelectMoodPageModule {}
