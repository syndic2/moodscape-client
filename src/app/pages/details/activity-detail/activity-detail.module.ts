import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPageRoutingModule } from './activity-detail-routing.module';
import { ActivityDetailPage } from './activity-detail.page';
import { ActivityCategoryListPageModule } from 'src/app/modals/activities/activity-category-list/activity-category-list.module';
import { ActivityIconListPageModule } from 'src/app/modals/activities/activity-icon-list/activity-icon-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDetailPageRoutingModule,
    ActivityCategoryListPageModule,
    ActivityIconListPageModule
  ],
  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
