import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityCategoryListItemComponent } from './activity-category-list-item.component';
import { ActivityCategoryPopoverComponent } from '../activity-category-popover/activity-category-popover.component';
import { ActivityCategoryEditNamePageModule } from 'src/app/modals/activities/activity-category-edit-name/activity-category-edit-name.module';

@NgModule({
  declarations: [
    ActivityCategoryListItemComponent,
    ActivityCategoryPopoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ActivityCategoryEditNamePageModule
  ],
  exports: [
    ActivityCategoryListItemComponent,
    ActivityCategoryPopoverComponent
  ]
})
export class ActivityCategoryListItemModule { }
