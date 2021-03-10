import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyArticlesPageRoutingModule } from './my-articles-routing.module';

import { MyArticlesPage } from './my-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyArticlesPageRoutingModule
  ],
  declarations: [MyArticlesPage]
})
export class MyArticlesPageModule {}
