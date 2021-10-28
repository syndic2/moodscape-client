import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Capacitor, Network } from '@capacitor/core';

import { FirebaseCloudMessagingService } from './services/firebase-cloud-messaging/firebase-cloud-messaging.service';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private zone: NgZone,
    private platform: Platform,
    private deepLinks: Deeplinks,
    private fcmService: FirebaseCloudMessagingService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.checkNetworkConnection();

    if (Capacitor.platform !== 'web') {
      this.platform.ready().then(() => {
        this.setupDeepLinks();
        this.hardwareBackButton();
        this.fcmService.initPush();
      });
    } else {
      console.log('Ionic platform: web version');
    }
  }

  checkNetworkConnection() {
    Network.addListener('networkStatusChange', status => {
      if (!status.connected) {
        this.modalService.internetConnectionError('Tidak ada koneksi internet');
      }
    });
  }

  setupDeepLinks() {
    this.deepLinks.route({ '/:resetToken': '/reset-password/:resetToken' }).subscribe(match => {
      const internalPath= `${match.$link.path}`;
      this.zone.run(() => {
        this.router.navigateByUrl(internalPath);
      });
    }, nomatch => {
      //alert(`not matching a deeplink: ${JSON.stringify(nomatch)}`);
      //console.error('not matching a deeplink', nomatch);
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
