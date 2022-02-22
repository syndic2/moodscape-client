import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { getAuthenticated } from './store/selectors/authentication.selectors';
import { FirebaseCloudMessagingService } from './services/firebase-cloud-messaging/firebase-cloud-messaging.service';
import { ThemeService } from './services/theme/theme.service';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private zone: NgZone,
    private platform: Platform,
    private deepLinks: Deeplinks,
    private fcmService: FirebaseCloudMessagingService,
    private themeService: ThemeService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.platform.ready().then(() => {
      GoogleAuth.initialize({
        clientId: '253594452296-gqh9id0dugdfajqd2iomqosjaq0ee12h.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true
      });
      this.checkNetworkConnection();

      const themesSubscription = this.themeService.getThemes().pipe(take(1)).subscribe(() => this.themeService.applyTheme());
      this.subscriptions.add(themesSubscription);

      if (Capacitor.getPlatform() !== 'web') {
        const getAuthenticatedSubscription = this.store.select(getAuthenticated).subscribe(res => {
          if (res) {
            this.fcmService.initPush(res.Id);
          }
        });
        this.subscriptions.add(getAuthenticatedSubscription);

        this.setupDeepLinks();
        this.hardwareBackButton();
      } else {
        console.log('Ionic platform: web version');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  checkNetworkConnection() {
    Network.addListener('networkStatusChange', status => {
      if (!status.connected) {
        this.modalService.internetConnectionError('Tidak ada koneksi internet');
      }
    });
  }

  setupDeepLinks() {
    const deepLinksSubscription = this.deepLinks.route({ '/:resetToken': '/reset-password/:resetToken' }).subscribe(match => {
      const internalPath = `${match.$link.path}`;
      this.zone.run(() => {
        this.router.navigateByUrl(internalPath);
      });
    }, nomatch => {
      //alert(`not matching a deeplink: ${JSON.stringify(nomatch)}`);
      //console.error('not matching a deeplink', nomatch);
    });
    this.subscriptions.add(deepLinksSubscription);
  }

  hardwareBackButton() {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (this.router.url === '/' || this.router.url === '/sign-in' || this.router.url === '/side-menu/tabs/home') {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }
}
