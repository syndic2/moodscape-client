import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { User } from 'src/app/models/user.model';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [
    ArticleService,
    { provide: 'skipLoading', useValue: 'true' }
  ]
})
export class HomePage implements OnInit {
  public user: User;
  public articles: Article[]= [];
  public clock;
  private clockInterval;
  public sliderOptions= {
		slidesPerView: 1,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
	};
  private getArticlesListener: Subscription= null;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.clockInterval= setInterval(() => {
      this.clock= transformDateTime(new Date());
    }, 1000);
  }

  ionViewWillEnter() {
    this.getArticlesListener= this.articleService.getAll().subscribe(res => {
      this.articles= res.articles;
    });
  }

  ionViewWillLeave() {
    clearInterval(this.clockInterval);
    this.getArticlesListener && this.getArticlesListener.unsubscribe();
  }
}
