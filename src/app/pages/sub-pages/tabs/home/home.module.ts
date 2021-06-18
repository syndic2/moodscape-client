import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ClockLoaderComponent } from 'src/app/components/utilities/clock-loader/clock-loader.component';
import { ArticleFeaturedItemComponent } from 'src/app/components/pages/articles/article-featured-item/article-featured-item.component';
import { ArticleFeaturedLoaderComponent } from 'src/app/components/pages/articles/article-featured-loader/article-featured-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ClockLoaderComponent,
    ArticleFeaturedItemComponent,
    ArticleFeaturedLoaderComponent
  ]
})
export class HomePageModule {}
