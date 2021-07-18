import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MDQTestPageRoutingModule } from './mdq-test-routing.module';

import { MDQTestPage } from './mdq-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MDQTestPageRoutingModule
  ],
  declarations: [MDQTestPage]
})
export class MDQTestPageModule {}
