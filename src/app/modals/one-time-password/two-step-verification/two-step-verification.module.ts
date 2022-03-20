import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TwoStepVerificationPage } from './two-step-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TwoStepVerificationPage]
})
export class TwoStepVerificationPageModule {
  static getComponent(): typeof TwoStepVerificationPage {
    return TwoStepVerificationPage;
  }
}
