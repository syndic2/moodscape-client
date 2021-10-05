import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoodListByDatePageRoutingModule } from './mood-list-by-date-routing.module';
import { MoodListByDatePage } from './mood-list-by-date.page';
import { MoodListItemModule } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.module';
import { MoodsCountModule } from 'src/app/components/pages/moods/moods-count/moods-count.module';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodListByDatePageRoutingModule,
    MoodListItemModule, 
    MoodsCountModule,
    SharedPipeModule
  ],
  declarations: [MoodListByDatePage]
})
export class MoodListByDatePageModule {}
