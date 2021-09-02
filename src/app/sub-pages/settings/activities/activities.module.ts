import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

import { ActivitiesPageRoutingModule } from './activities-routing.module';
import { ActivitiesPage } from './activities.page';
import { ActivityCategoryListItemModule } from 'src/app/components/pages/activities/activity-category-list-item/activity-category-list-item.module';
import { ActivityCategoryListPageModule } from 'src/app/modals/activities/activity-category-list/activity-category-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.ACTIVITY, activityReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    EffectsModule.forFeature([ActivityEffects]),
    ActivitiesPageRoutingModule,
    ActivityCategoryListItemModule,
    ActivityCategoryListPageModule
  ],
  declarations: [ActivitiesPage]
})
export class ActivitiesPageModule {}
