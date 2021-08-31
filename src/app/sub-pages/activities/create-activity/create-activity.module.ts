import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateActivityPageRoutingModule } from './create-activity-routing.module';
import { CreateActivityPage } from './create-activity.page';
import { ActivityIconListPageModule } from 'src/app/modals/activities/activity-icon-list/activity-icon-list.module';
import { ActivityCategoryListPageModule } from 'src/app/modals/activities/activity-category-list/activity-category-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateActivityPageRoutingModule,
    ActivityIconListPageModule,
    ActivityCategoryListPageModule
  ],
  declarations: [CreateActivityPage]
})
export class CreateActivityPageModule {}
