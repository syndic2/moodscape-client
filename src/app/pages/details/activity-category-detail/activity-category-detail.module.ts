import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityCategoryDetailPageRoutingModule } from './activity-category-detail-routing.module';

import { ActivityCategoryDetailPage } from './activity-category-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityCategoryDetailPageRoutingModule
  ],
  declarations: [ActivityCategoryDetailPage]
})
export class ActivityCategoryDetailPageModule {}
