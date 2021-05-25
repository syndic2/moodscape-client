import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ArticleListLoaderComponent } from './article-list-loader.component';

@NgModule({
  declarations: [
    ArticleListLoaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleListLoaderComponent
  ]
})
export class ArticleListLoaderModule { }
