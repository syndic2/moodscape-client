import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';

import { ArticleEffects } from 'src/app/store/effects/article.effects';
import { ArticleListItemModule } from 'src/app/components/pages/articles/article-list-item/article-list-item.module';
import { ArticleListLoaderModule } from 'src/app/components/pages/articles/article-list-loader/article-list-loader.module';
import { ArticlesPageRoutingModule } from './articles-routing.module';
import { ArticlesPage } from './articles.page';
import { ArticleCardItemModule } from 'src/app/components/pages/articles/article-card-item/article-card-item.module';
import { ArticleCardLoaderComponent } from 'src/app/components/pages/articles/article-card-loader/article-card-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    EffectsModule.forFeature([ArticleEffects]),
    ArticleCardItemModule,
    ArticleListItemModule,
    ArticleListLoaderModule,
    ArticlesPageRoutingModule
  ],
  declarations: [
    ArticlesPage,
    ArticleCardLoaderComponent
  ]
})
export class ArticlesPageModule { }
