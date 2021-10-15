import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { transformDateTime } from 'src/app/utilities/helpers';
import { User } from 'src/app/models/user.model';
import { Article } from 'src/app/models/article.model';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchFeaturedArticles } from 'src/app/store/actions/article.actions';
import { getAuthenticated } from 'src/app/store/selectors/authentication.selectors';
import { getFeaturedArticles } from 'src/app/store/selectors/article.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild('myChatEmotionsCard', { static: true }) myChatEmotionsCard: ElementRef;
  @ViewChild('MDQTestCard', { static: true }) MDQTestCard: ElementRef;

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
  private getAuthenticatedSubscription: Subscription;
  private featuredArticlesSubscription: Subscription;

  constructor(private store: Store, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAuthenticatedSubscription= this.store
      .select(getAuthenticated)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (res) {
        this.user= { ...res };
      }
    });

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

  onOpenMyChatEmotions() {
    poppingAnimation('my-chat-emotions-card', this.myChatEmotionsCard).play().finally(() => {
      this.store.dispatch(navigateGo({ path: ['/my-chat-emotions'] }));
    });
  }

  onOpenMDQTest() {
    poppingAnimation('mdq-test-card', this.MDQTestCard).play().finally(() => {
      this.store.dispatch(navigateGo({ path: ['/mdq-test'] }));
    });
  }
}
