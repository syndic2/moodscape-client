import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MDQResultPageRoutingModule } from './mdq-result-routing.module';

import { MDQResultPage } from './mdq-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDQResultPageRoutingModule
  ],
  declarations: [MDQResultPage]
})
export class MDQResultPageModule {}
