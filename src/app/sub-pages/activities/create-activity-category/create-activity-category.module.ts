import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateActivityCategoryPageRoutingModule } from './create-activity-category-routing.module';
import { CreateActivityCategoryPage } from './create-activity-category.page';
import { ActivityListPageModule } from 'src/app/modals/activities/activity-list/activity-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateActivityCategoryPageRoutingModule,
    ActivityListPageModule
  ],
  declarations: [CreateActivityCategoryPage]
})
export class CreateActivityCategoryPageModule {}
