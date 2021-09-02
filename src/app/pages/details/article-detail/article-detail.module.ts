import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD
import { EffectsModule } from '@ngrx/effects';
=======
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreFeatureKeys } from 'src/app/store/feature-keys';
import { articleReducer } from 'src/app/store/reducers/article.reducer';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { ArticleEffects } from 'src/app/store/effects/article.effects';

import { ArticleDetailPageRoutingModule } from './article-detail-routing.module';
import { ArticleDetailPage } from './article-detail.page';

@NgModule({
  declarations: [ArticleDetailPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
=======
    StoreModule.forFeature(StoreFeatureKeys.ARTICLE, articleReducer),
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    EffectsModule.forFeature([ArticleEffects]),
    ArticleDetailPageRoutingModule
  ]
})
export class ArticleDetailPageModule {}
