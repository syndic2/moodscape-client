import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD
import { EffectsModule } from '@ngrx/effects';
=======
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { activityReducer } from 'src/app/store/reducers/activity.reducer';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { ActivityEffects } from 'src/app/store/effects/activity.effects';

import { SelectActivitiesComponent } from './select-activities.component';
import { ActivityCategoryOptionsPopoverModule } from '../../pages/moods/activity-category-options-popover/activity-category-options-popover.module';
import { AccordionModule } from '../../widgets/accordion/accordion.module';

@NgModule({
  declarations: [SelectActivitiesComponent],
  imports: [
    CommonModule,
    IonicModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.ACTIVITY, activityReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    EffectsModule.forFeature([ActivityEffects]),
    ActivityCategoryOptionsPopoverModule,
    AccordionModule
  ],
  exports: [SelectActivitiesComponent]
})
export class SelectActivitiesModule { }
