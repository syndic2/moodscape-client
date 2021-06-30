import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoodsPageRoutingModule } from './moods-routing.module';
import { MoodsPage } from './moods.page';
import { MoodListItemComponent } from 'src/app/components/pages/moods/mood-list-item/mood-list-item.component';
import { MoodListLoaderComponent } from 'src/app/components/pages/moods/mood-list-loader/mood-list-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodsPageRoutingModule
  ],
  declarations: [
    MoodsPage,
    MoodListItemComponent,
    MoodListLoaderComponent
  ]
})
export class MoodsPageModule {}
