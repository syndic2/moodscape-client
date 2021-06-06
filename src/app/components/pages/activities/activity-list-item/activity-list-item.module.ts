import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActivityListItemComponent } from './activity-list-item.component';

@NgModule({
  declarations: [
    ActivityListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ActivityListItemComponent
  ]
})
export class ActivityListItemModule { }
