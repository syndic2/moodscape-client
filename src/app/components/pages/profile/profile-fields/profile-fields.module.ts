import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFieldsComponent } from './profile-fields.component';

@NgModule({
  declarations: [ProfileFieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [ProfileFieldsComponent]
})
export class ProfileFieldsModule { }
