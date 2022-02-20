import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SearchResultsArticlePageRoutingModule } from './search-results-article-routing.module';
import { SearchResultsArticlePage } from './search-results-article.page';
import { ArticleListItemModule } from 'src/app/components/pages/articles/article-list-item/article-list-item.module';
import { ArticleListLoaderModule } from 'src/app/components/pages/articles/article-list-loader/article-list-loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    SearchResultsArticlePageRoutingModule,
    ArticleListItemModule,
    ArticleListLoaderModule
  ],
  declarations: [SearchResultsArticlePage]
})
export class SearchResultsArticlePageModule { }
