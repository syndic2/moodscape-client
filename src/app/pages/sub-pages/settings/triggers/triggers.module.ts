import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriggersPageRoutingModule } from './triggers-routing.module';

import { TriggersPage } from './triggers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriggersPageRoutingModule
  ],
  declarations: [TriggersPage]
})
export class TriggersPageModule {}
