import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userActivitiesReducer } from 'src/app/store/reducers/user-activities.reducer';

import { ActivitiesPageRoutingModule } from './activities-routing.module';
import { ActivitiesPage } from './activities.page';
import { ActivityCategoryListItemModule } from 'src/app/components/pages/activities/activity-category-list-item/activity-category-list-item.module';
import { ActivityCategoryListPageModule } from 'src/app/modals/activities/activity-category-list/activity-category-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.UserActivities, userActivitiesReducer),
    ActivitiesPageRoutingModule,
    ActivityCategoryListItemModule,
    ActivityCategoryListPageModule
  ],
  declarations: [ActivitiesPage]
})
export class ActivitiesPageModule {}
