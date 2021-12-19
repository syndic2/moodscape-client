import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FooterComponent } from '../components/footer/footer.component';

const Components = [
  FooterComponent
];

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [...Components]
})
export class SharedModule { }
