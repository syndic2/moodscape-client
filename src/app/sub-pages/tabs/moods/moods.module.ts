import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';

import { MoodEffects } from 'src/app/store/effects/mood.effects';
import { MoodsPageRoutingModule } from './moods-routing.module';
import { MoodsPage } from './moods.page';
import { MoodListItemModule } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.module';
import { MoodListLoaderModule } from 'src/app/components/pages/moods/mood-list-loader/mood-list-loader.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    FontAwesomeModule,
    EffectsModule.forFeature([MoodEffects]),
    MoodsPageRoutingModule,
    MoodListItemModule,
    MoodListLoaderModule,
    SharedPipeModule
  ],
  declarations: [MoodsPage]
})
export class MoodsPageModule { }
