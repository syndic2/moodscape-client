import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from 'src/app/store/effects/article.effects';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ClockLoaderComponent } from 'src/app/components/utilities/clock-loader/clock-loader.component';
import { ArticleFeaturedItemModule } from 'src/app/components/pages/articles/article-featured-item/article-featured-item.module';
import { ArticleFeaturedLoaderComponent } from 'src/app/components/pages/articles/article-featured-loader/article-featured-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EffectsModule.forFeature([ArticleEffects]),
    ArticleFeaturedItemModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ClockLoaderComponent,
    ArticleFeaturedLoaderComponent
  ]
})
export class HomePageModule { }
