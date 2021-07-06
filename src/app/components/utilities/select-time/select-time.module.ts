import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { SelectTimeComponent } from './select-time.component';

@NgModule({
  declarations: [SelectTimeComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgxMaterialTimepickerModule
  ],
  exports: [SelectTimeComponent]
})
export class SelectTimeModule { }
