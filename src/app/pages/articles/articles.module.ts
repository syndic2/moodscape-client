import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleListItemModule } from 'src/app/components/pages/articles/article-list-item/article-list-item.module';
import { ArticleListLoaderModule } from 'src/app/components/pages/articles/article-list-loader/article-list-loader.module';
import { ArticlesPageRoutingModule } from './articles-routing.module';
import { ArticlesPage } from './articles.page';
import { ArticleCardItemComponent } from 'src/app/components/pages/articles/article-card-item/article-card-item.component';
import { ArticleCardLoaderComponent } from 'src/app/components/pages/articles/article-card-loader/article-card-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleListItemModule,
    ArticleListLoaderModule,
    ArticlesPageRoutingModule
  ],
  declarations: [
    ArticlesPage,
    ArticleCardItemComponent,
    ArticleCardLoaderComponent
  ]
})
export class ArticlesPageModule {}
