import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MoodsCountComponent } from './moods-count.component';

@NgModule({
  declarations: [MoodsCountComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MoodsCountComponent]
})
export class MoodsCountModule { }
