import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userActivitiesReducer } from 'src/app/store/reducers/user-activities.reducer';

import { CreateDetailMoodPageRoutingModule } from './create-detail-mood-routing.module';
import { CreateDetailMoodPage } from './create-detail-mood.page';
import { ActivityCategoryOptionsPopoverModule } from 'src/app/components/pages/moods/activity-category-options-popover/activity-category-options-popover.module';
import { AccordionModule } from 'src/app/components/widgets/accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.UserActivities, userActivitiesReducer),
    CreateDetailMoodPageRoutingModule,
    ActivityCategoryOptionsPopoverModule,
    AccordionModule
  ],
  declarations: [CreateDetailMoodPage]
})
export class CreateDetailMoodPageModule {}
