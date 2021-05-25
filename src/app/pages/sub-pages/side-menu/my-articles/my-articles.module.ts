import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleListItemModule } from 'src/app/components/pages/articles/article-list-item/article-list-item.module';
import { ArticleListLoaderModule } from 'src/app/components/pages/articles/article-list-loader/article-list-loader.module';
import { MyArticlesPageRoutingModule } from './my-articles-routing.module';
import { MyArticlesPage } from './my-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleListItemModule,
    ArticleListLoaderModule,
    MyArticlesPageRoutingModule
  ],
  declarations: [
    MyArticlesPage,
  ]
})
export class MyArticlesPageModule {}
