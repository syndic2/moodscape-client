import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoodPageRoutingModule } from './search-mood-routing.module';

import { SearchMoodPage } from './search-mood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoodPageRoutingModule
  ],
  declarations: [SearchMoodPage]
})
export class SearchMoodPageModule {}
