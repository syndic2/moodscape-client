import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { articleReducer } from 'src/app/store/reducers/article.reducer';
import { ArticleEffects } from 'src/app/store/effects/article.effects';

import { ArticleListItemModule } from 'src/app/components/pages/articles/article-list-item/article-list-item.module';
import { ArticleListLoaderModule } from 'src/app/components/pages/articles/article-list-loader/article-list-loader.module';
import { MyArticlesPageRoutingModule } from './my-articles-routing.module';
import { MyArticlesPage } from './my-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    StoreModule.forFeature(StoreFeatureKeys.ARTICLE, articleReducer),
    EffectsModule.forFeature([ArticleEffects]),
    ArticleListItemModule,
    ArticleListLoaderModule,
    MyArticlesPageRoutingModule
  ],
  declarations: [MyArticlesPage]
})
export class MyArticlesPageModule {}
