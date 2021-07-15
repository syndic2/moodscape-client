import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoodPageRoutingModule } from './search-mood-routing.module';
import { SearchMoodPage } from './search-mood.page';
import { SelectEmoticonModule } from 'src/app/components/utilities/select-emoticon/select-emoticon.module';
import { SelectActivitiesModule } from 'src/app/components/utilities/select-activities/select-activities.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoodPageRoutingModule,
    SelectEmoticonModule,
    SelectActivitiesModule
  ],
  declarations: [SearchMoodPage]
})
export class SearchMoodPageModule {}
