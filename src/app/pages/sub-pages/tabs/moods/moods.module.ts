import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userMoodsReducer } from 'src/app/store/reducers/user-moods.reducer';

import { MoodsPageRoutingModule } from './moods-routing.module';
import { MoodsPage } from './moods.page';
import { MoodListItemModule } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.module';
import { MoodListLoaderComponent } from 'src/app/components/pages/moods/mood-list-loader/mood-list-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.UserMoods, userMoodsReducer),
    MoodsPageRoutingModule,
    MoodListItemModule
  ],
  declarations: [
    MoodsPage,
    MoodListLoaderComponent
  ]
})
export class MoodsPageModule {}
