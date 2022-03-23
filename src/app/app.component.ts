import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { getAuthenticated } from './store/selectors/authentication.selectors';
import { FirebaseCloudMessagingService } from './services/firebase-cloud-messaging/firebase-cloud-messaging.service';
import { ThemeService } from './services/theme/theme.service';
import { ModalService } from './services/modal/modal.service';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private PWAInstallPrompt = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private swUpdate: SwUpdate,
    private store: Store,
    private router: Router,
    private zone: NgZone,
    private platform: Platform,
    private fcmService: FirebaseCloudMessagingService,
    private themeService: ThemeService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {
    const platformReady = await this.platform.ready();

    if (platformReady) {
      GoogleAuth.initialize({
        clientId: '253594452296-gqh9id0dugdfajqd2iomqosjaq0ee12h.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true
      });

      const themesSubscription = this.themeService.getThemes().pipe(take(1)).subscribe(() => this.themeService.applyTheme());
      this.subscriptions.add(themesSubscription);

      if (Capacitor.getPlatform() !== 'web') {
        this.setupNotifications('mobile');
        this.notificationService.registerLocalNotification();
        this.setupDeepLinks();
        this.checkNetworkConnection();
        this.hardwareBackButton();
      } else { //PWA
        if (this.swUpdate.available) {
          this.setupNotifications('pwa');

          const swUpdateSubscription = this.swUpdate.available.subscribe(() => {
            if (confirm('A new version is available. Do you want to load it?')) window.location.reload();
          });
          this.subscriptions.add(swUpdateSubscription);
        }

        console.log('Ionic platform: PWA version');
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showPWAInstallPrompt() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.PWAInstallPrompt = e;
    });
  }

  askUserToInstallPWA() {
    this.PWAInstallPrompt.prompt();
  }

  setupNotifications(platform: 'mobile' | 'pwa') {
    const getAuthenticatedSubscription = this.store.select(getAuthenticated).subscribe(res => {
      if (res) {
        if (platform === 'mobile') {
          this.fcmService.registerPushMobile(res.Id);
        } else {
          this.fcmService.registerPushPWA(res.Id);
        }
      }
    });
    this.subscriptions.add(getAuthenticatedSubscription);
  }

  setupDeepLinks() {
    CapacitorApp.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'moodscape-app.web.app';
        const pathArray = event.url.split(domain);
        const appPath = pathArray.pop();

        if (appPath) {
          this.router.navigateByUrl(appPath);
        }
      });
    });
  }

  checkNetworkConnection() {
    Network.addListener('networkStatusChange', status => {
      if (!status.connected) {
        this.modalService.internetConnectionError('Tidak ada koneksi internet');
      }
    });
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
