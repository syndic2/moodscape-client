import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ActivityCategoryOptionsPopoverComponent } from './activity-category-options-popover.component';

@NgModule({
  declarations: [ActivityCategoryOptionsPopoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ActivityCategoryOptionsPopoverComponent]
})
export class ActivityCategoryOptionsPopoverModule { }
