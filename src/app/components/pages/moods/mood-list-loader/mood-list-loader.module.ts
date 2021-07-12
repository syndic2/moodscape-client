import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MoodListLoaderComponent } from './mood-list-loader.component';

@NgModule({
  declarations: [MoodListLoaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MoodListLoaderComponent]
})
export class MoodListLoaderModule { }
