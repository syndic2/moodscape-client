import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private platform: Platform
  ) {
    this.setupDeepLinks();
    this.hardwareBackButton();
  }

  setupDeepLinks() {
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
