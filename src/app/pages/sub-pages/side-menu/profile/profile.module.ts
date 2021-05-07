import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { ProfileFieldsLoaderComponent } from 'src/app/components/pages/profile/profile-fields-loader/profile-fields-loader.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		IonicModule,
		ProfilePageRoutingModule
	],
	declarations: [
		ProfilePage,
		ProfileFieldsLoaderComponent
	]
})
export class ProfilePageModule { }
