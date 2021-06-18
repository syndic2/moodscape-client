import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ArticleListItemComponent } from './article-list-item.component';

@NgModule({
  declarations: [
    ArticleListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticleListItemComponent
  ]
})
export class ArticleListItemModule { }
