import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { Storage } from '@ionic/storage';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications, ActionPerformed as LocalNotificationActionPerformed } from '@capacitor/local-notifications';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed as PushNoticationActionPerformed } from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';

import { Observable, from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCloudMessagingService {
  private apiUrl: string = environment.apiUrl.replace('/api', '');

  constructor(
    private afMessaging: AngularFireMessaging,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    private modalService: ModalService
  ) { }

  registerPushMobile(userId: string) {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        this.modalService.requestError('Push Notification plugin not granted');
      }
    });

    PushNotifications.addListener('registration', async (res: Token) => {
      let token = res.value;

      if (Capacitor.getPlatform() === 'ios') {
        const { token: fcmToken } = await FCM.getToken();
        token = fcmToken;
      }

      this.saveToken(userId, token)
        .pipe(
          take(1),
          switchMap(() => from(this.storage.set('fcm-token', token)))
        )
        .subscribe();
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      this.modalService.requestError(`Error ${JSON.stringify(error)}`);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: notification.title,
            body: notification.body,
            schedule: {
              allowWhileIdle: true
            }
          }
        ]
      });

      LocalNotifications.addListener('localNotificationActionPerformed', (event: LocalNotificationActionPerformed) => {
        this.router.navigate(['/side-menu/tabs/habits']);
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNoticationActionPerformed) => {
      this.router.navigate(['/side-menu/tabs/habits']);
    });
  }

  registerPushPWA(userId: string) {
    this.afMessaging.requestToken.pipe(take(1)).subscribe(token => {
      this.saveToken(userId, token)
        .pipe(
          take(1),
          switchMap(() => from(this.storage.set('fcm-token', token)))
        )
        .subscribe();
    });
  }

  saveToken(userId: string, token: string): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/services/fcm/save-token`,
      JSON.stringify({ user_id: userId, token: token }),
      {
        headers: {
          skipLoading: 'true'
        }
      }
    );
  }

  removeToken(token: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/services/fcm/remove-token/${token}`);
  }
}
