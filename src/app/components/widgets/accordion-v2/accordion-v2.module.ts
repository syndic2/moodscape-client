import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccordionV2Component } from './accordion-v2.component';

@NgModule({
  declarations: [AccordionV2Component],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AccordionV2Component]
})
export class AccordionV2Module { }
