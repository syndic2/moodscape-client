import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleDetailPageRoutingModule } from './article-detail-routing.module';
import { ArticleDetailPage } from './article-detail.page';
import { ArticleDetailComponent } from 'src/app/components/shared-core/article-detail/article-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleDetailPageRoutingModule
  ],
  declarations: [
    ArticleDetailPage,
    ArticleDetailComponent
  ]
})
export class ArticleDetailPageModule {}
