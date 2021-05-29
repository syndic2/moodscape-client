import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitiesPageRoutingModule } from './activities-routing.module';
import { ActivitiesPage } from './activities.page';
import { ActivityListItemComponent } from 'src/app/components/pages/activities/activity-list-item/activity-list-item.component';
import { ActivityCategoryListItemComponent } from 'src/app/components/pages/activities/activity-category-list-item/activity-category-list-item.component';
import { ActivityCategoryListLoaderComponent } from 'src/app/components/pages/activities/activity-category-list-loader/activity-category-list-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitiesPageRoutingModule,
  ],
  declarations: [
    ActivitiesPage,
    ActivityListItemComponent,
    ActivityCategoryListItemComponent,
    ActivityCategoryListLoaderComponent
  ]
})
export class ActivitiesPageModule {}
