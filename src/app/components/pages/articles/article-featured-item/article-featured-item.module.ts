import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';
import { ArticleFeaturedItemComponent } from './article-featured-item.component';

@NgModule({
  declarations: [ArticleFeaturedItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedPipeModule
  ],
  exports: [
    ArticleFeaturedItemComponent
  ]
})
export class ArticleFeaturedItemModule { }
