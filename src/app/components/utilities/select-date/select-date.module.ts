import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SelectDateComponent } from './select-date.component';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [SelectDateComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [SelectDateComponent]
})
export class SelectDateModule { }
