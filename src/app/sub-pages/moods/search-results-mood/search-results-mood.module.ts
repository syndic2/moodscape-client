import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { moodsReducer } from 'src/app/store/reducers/moods.reducer';

import { SearchResultsMoodPageRoutingModule } from './search-results-mood-routing.module';
import { SearchResultsMoodPage } from './search-results-mood.page';
import { MoodListLoaderModule } from 'src/app/components/pages/moods/mood-list-loader/mood-list-loader.module';
import { MoodListItemModule } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.module';
import { MoodSearchFiltersComponent } from 'src/app/components/pages/moods/mood-search-filters/mood-search-filters.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.MoodsState, moodsReducer),
    SearchResultsMoodPageRoutingModule,
    MoodListItemModule,
    MoodListLoaderModule
  ],
  declarations: [
    SearchResultsMoodPage,
    MoodSearchFiltersComponent
  ]
})
export class SearchResultsMoodPageModule {}
