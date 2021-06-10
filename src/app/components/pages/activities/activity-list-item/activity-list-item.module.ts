import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActivityListItemComponent } from './activity-list-item.component';
import { ActivityPopoverComponent } from '../activity-popover/activity-popover.component';
import { ActivityEditNamePageModule } from 'src/app/modals/activities/activity-edit-name/activity-edit-name.module';
import { ActivityCategoryListPageModule } from 'src/app/modals/activities/activity-category-list/activity-category-list.module';

@NgModule({
  declarations: [
    ActivityListItemComponent,
    ActivityPopoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    ActivityEditNamePageModule,
    ActivityCategoryListPageModule
  ],
  exports: [
    ActivityListItemComponent,
    ActivityPopoverComponent
  ]
})
export class ActivityListItemModule { }
