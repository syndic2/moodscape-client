import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { activityReducer } from 'src/app/store/reducers/activity.reducer';
import { ActivityEffects } from 'src/app/store/effects/activity.effects';

import { ActivityListItemModule } from 'src/app/components/pages/activities/activity-list-item/activity-list-item.module';
import { KeepedActivitiesPageRoutingModule } from './keeped-activities-routing.module';
import { KeepedActivitiesPage } from './keeped-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(StoreFeatureKeys.ACTIVITY, activityReducer),
    EffectsModule.forFeature([ActivityEffects]),
    ActivityListItemModule,
    KeepedActivitiesPageRoutingModule
  ],
  declarations: [
    KeepedActivitiesPage
  ]
})
export class KeepedActivitiesPageModule {}
