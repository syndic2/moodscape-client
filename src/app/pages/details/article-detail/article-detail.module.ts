import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/store/effects/article.effects';

import { SharedPipeModule } from 'src/app/modules/shared-pipe.module';
import { ArticleDetailPageRoutingModule } from './article-detail-routing.module';
import { ArticleDetailPage } from './article-detail.page';

@NgModule({
  declarations: [ArticleDetailPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([ArticleEffects]),
    SharedPipeModule,
    ArticleDetailPageRoutingModule
  ]
})
export class ArticleDetailPageModule { }
