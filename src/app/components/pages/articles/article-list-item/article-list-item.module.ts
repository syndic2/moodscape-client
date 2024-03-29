import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';
import { ArticleListItemComponent } from './article-list-item.component';

@NgModule({
  declarations: [
    ArticleListItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [
    ArticleListItemComponent
  ]
})
export class ArticleListItemModule { }
