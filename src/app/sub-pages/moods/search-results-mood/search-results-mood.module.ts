import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD
=======
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { moodReducer } from 'src/app/store/reducers/mood.reducer';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

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
    IonicModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.MOOD, moodReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
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
export class SearchResultsMoodPageModule {}
