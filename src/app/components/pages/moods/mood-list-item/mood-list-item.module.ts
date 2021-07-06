import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoodListItemComponent } from './mood-list-item.component';
import { MoodPopoverComponent } from '../mood-popover/mood-popover.component';
import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';

@NgModule({
  declarations: [
    MoodListItemComponent,
    MoodPopoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [
    MoodListItemComponent,
    MoodPopoverComponent
  ]
})
export class MoodListItemModule { }
