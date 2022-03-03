import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InternetConnectionErrorPage } from './internet-connection-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [InternetConnectionErrorPage]
})
export class InternetConnectionErrorPageModule {
  static getComponent(): typeof InternetConnectionErrorPage {
    return InternetConnectionErrorPage;
  }
}
