import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { ActivityEffects } from 'src/app/store/effects/activity.effects';

import { SelectActivitiesComponent } from './select-activities.component';
import { ActivityCategoryOptionsPopoverModule } from '../../pages/moods/activity-category-options-popover/activity-category-options-popover.module';
import { AccordionModule } from '../../widgets/accordion/accordion.module';

@NgModule({
  declarations: [SelectActivitiesComponent],
  imports: [
    CommonModule,
    IonicModule,
    EffectsModule.forFeature([ActivityEffects]),
    ActivityCategoryOptionsPopoverModule,
    AccordionModule
  ],
  exports: [SelectActivitiesComponent]
})
export class SelectActivitiesModule { }
