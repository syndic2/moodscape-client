import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { transformDateTime } from 'src/app/utilities/helpers';
import { User } from 'src/app/models/user.model';
import { Article } from 'src/app/models/article.model';
import { fetchFeaturedArticles } from 'src/app/store/actions/article.actions';
import { getFeaturedArticles } from 'src/app/store/selectors/article.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public user: User;
  public articles: Article[]= [];
  public clock= transformDateTime(new Date());
  public sliderOptions= {
		slidesPerView: 1,
		spaceBetween: 5,
		loop: true,
		autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
	};
  private featuredArticlesSubscription: Subscription;

  constructor(private store: Store, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.featuredArticlesSubscription= this.store
      .select(getFeaturedArticles)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchFeaturedArticles());
      } else {
        this.articles= res;
      }
    });
  }

  ionViewWillLeave() {
    this.featuredArticlesSubscription && this.featuredArticlesSubscription.unsubscribe();
  }
}
