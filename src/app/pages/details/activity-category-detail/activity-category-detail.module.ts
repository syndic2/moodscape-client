import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityCategoryDetailPageRoutingModule } from './activity-category-detail-routing.module';
import { ActivityCategoryDetailPage } from './activity-category-detail.page';
import { ActivityListItemModule } from 'src/app/components/pages/activities/activity-list-item/activity-list-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityCategoryDetailPageRoutingModule,
    ActivityListItemModule
  ],
  declarations: [ActivityCategoryDetailPage]
})
export class ActivityCategoryDetailPageModule {}
