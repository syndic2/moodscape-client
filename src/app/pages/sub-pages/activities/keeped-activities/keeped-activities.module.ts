import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityListItemModule } from 'src/app/components/pages/activities/activity-list-item/activity-list-item.module';
import { KeepedActivitiesPageRoutingModule } from './keeped-activities-routing.module';
import { KeepedActivitiesPage } from './keeped-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityListItemModule,
    KeepedActivitiesPageRoutingModule
  ],
  declarations: [
    KeepedActivitiesPage,
  ]
})
export class KeepedActivitiesPageModule {}
