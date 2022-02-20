import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';

import { SearchResultsMoodPageRoutingModule } from './search-results-mood-routing.module';
import { SearchResultsMoodPage } from './search-results-mood.page';
import { MoodListLoaderModule } from 'src/app/components/pages/moods/mood-list-loader/mood-list-loader.module';
import { MoodListItemModule } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.module';
import { MoodSearchFiltersComponent } from 'src/app/components/pages/moods/mood-search-filters/mood-search-filters.component';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    SearchResultsMoodPageRoutingModule,
    MoodListItemModule,
    MoodListLoaderModule,
    SharedPipeModule
  ],
  declarations: [
    SearchResultsMoodPage,
    MoodSearchFiltersComponent
  ]
})
export class SearchResultsMoodPageModule { }
