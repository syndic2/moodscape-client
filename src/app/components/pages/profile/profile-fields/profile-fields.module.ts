import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileFieldsComponent } from './profile-fields.component';
import { CalendarPageModule } from 'src/app/modals/calendar/calendar.module';

@NgModule({
  declarations: [ProfileFieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CalendarPageModule
  ],
  exports: [ProfileFieldsComponent]
})
export class ProfileFieldsModule { }
