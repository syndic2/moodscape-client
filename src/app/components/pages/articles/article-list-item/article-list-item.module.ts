import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListItemComponent } from './article-list-item.component';

@NgModule({
  declarations: [
    ArticleListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleListItemComponent
  ]
})
export class ArticleListItemModule { }
