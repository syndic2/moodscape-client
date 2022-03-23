import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private storage: Storage,
    private alertController: AlertController,
    private router: Router
  ) { }

  setReminderTime(feature: string, reminderTime: string): Promise<any> {
    return this.storage.set(feature, reminderTime);
  }

  getReminderTime(feature: string): Promise<any> {
    return this.storage.get(feature);
  }

  registerLocalNotification() {
    LocalNotifications.addListener('localNotificationReceived', async (notification: LocalNotificationSchema) => {
      const alert = await this.alertController.create({
        message: notification.title,
        buttons: [
          {
            text: 'Tutup',
            role: 'cancel'
          },
          {
            text: 'Menuju ke Mood Journaling',
            handler: () => {
              this.router.navigate(['/moods/create/step-1']);
            }
          }
        ]
      });
      alert.present();
    });

    LocalNotifications.addListener('localNotificationActionPerformed', () => {
      this.router.navigate(['/moods/create/step-1']);
    });
  }

  async setLocalNotification() {
    const reminderTime = await this.getReminderTime('mood-tracker');

    if (reminderTime) {
      const time = reminderTime.split(':');
      const notifyAt = new Date();
      notifyAt.setHours(parseInt(time[0]));
      notifyAt.setMinutes(parseInt(time[1]));

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: 'Waktunya untuk mengisi Mood Journaling',
            body: 'Jangan lupa untuk melacak suasana hati anda ya!',
            iconColor: '#0000FF',
            schedule: {
              at: new Date(notifyAt.getTime() + 3000),
              every: 'day',
              allowWhileIdle: true
            }
          }
        ]
      });
    }
  }
}
