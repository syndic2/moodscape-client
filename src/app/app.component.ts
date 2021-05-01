import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private location: Location,
    private zone: NgZone,
    private deepLinks: Deeplinks,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setupDeepLinks();
      this.hardwareBackButton();
    });
  }

  setupDeepLinks() {
    this.deepLinks.route({ '/:resetToken': 'reset-password' }).subscribe(match => {
      console.log('successfully matched route', match);
      console.log('internal path', `${match.$route}/${match.$args.resetToken}`);
      this.zone.run(() => {
        this.router.navigate([match.$route, match.$args.resetToken]);
      });
    });
  }

  hardwareBackButton() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/' || this.router.url === '/sign-in' || this.router.url === '/side-menu/tabs/home') {
        navigator['app'].exitApp();
      } else {
        this.location.back();
      }
    });
  }
}
