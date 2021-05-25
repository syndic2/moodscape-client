import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListLoaderComponent } from './article-list-loader.component';

@NgModule({
  declarations: [
    ArticleListLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleListLoaderComponent
  ]
})
export class ArticleListLoaderModule { }
