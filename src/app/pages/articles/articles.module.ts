import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesPageRoutingModule } from './articles-routing.module';
import { ArticlesPage } from './articles.page';
import { ArticleCardItemComponent } from 'src/app/components/pages/articles/article-card-item/article-card-item.component';
import { ArticleListItemComponent } from 'src/app/components/pages/articles/article-list-item/article-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesPageRoutingModule
  ],
  declarations: [
    ArticlesPage,
    ArticleCardItemComponent,
    ArticleListItemComponent
  ]
})
export class ArticlesPageModule {}
