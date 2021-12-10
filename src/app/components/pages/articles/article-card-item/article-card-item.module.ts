import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';
import { ArticleCardItemComponent } from './article-card-item.component';

@NgModule({
  declarations: [ArticleCardItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [ArticleCardItemComponent]
})
export class ArticleCardItemModule { }
