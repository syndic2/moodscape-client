import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SelectEmoticonComponent } from './select-emoticon.component';

@NgModule({
  declarations: [
    SelectEmoticonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SelectEmoticonComponent
  ]
})
export class SelectEmoticonModule { }
