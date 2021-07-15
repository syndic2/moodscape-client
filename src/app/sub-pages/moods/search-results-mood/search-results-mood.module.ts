import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userMoodsReducer } from 'src/app/store/reducers/user-moods.reducer';

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
    StoreModule.forFeature(StoreFeatureKeys.UserMoods, userMoodsReducer),
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
