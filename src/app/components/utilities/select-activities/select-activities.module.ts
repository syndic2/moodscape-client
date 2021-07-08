import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { userActivitiesReducer } from 'src/app/store/reducers/user-activities.reducer';

import { SelectActivitiesComponent } from './select-activities.component';
import { ActivityCategoryOptionsPopoverModule } from '../../pages/moods/activity-category-options-popover/activity-category-options-popover.module';
import { AccordionModule } from '../../widgets/accordion/accordion.module';

@NgModule({
  declarations: [SelectActivitiesComponent],
  imports: [
    CommonModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.UserActivities, userActivitiesReducer),
    ActivityCategoryOptionsPopoverModule,
    AccordionModule
  ],
  exports: [SelectActivitiesComponent]
})
export class SelectActivitiesModule { }
