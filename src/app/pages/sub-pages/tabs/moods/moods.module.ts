import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoodsPageRoutingModule } from './moods-routing.module';

import { MoodsPage } from './moods.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoodsPageRoutingModule
  ],
  declarations: [MoodsPage]
})
export class MoodsPageModule {}
