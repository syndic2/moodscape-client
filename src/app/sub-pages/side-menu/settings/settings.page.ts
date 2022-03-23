import { Component, OnInit } from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public pages: any[] = [
    //{
    //  title: 'Aktivitas',
    //	url: '/settings/activities',
    //	icon: 'accessibility'
    //},
    {
      title: 'Tema',
      url: '/settings/themes',
      icon: 'color-palette'
    },
    {
      title: 'Ubah Kata Sandi',
      url: '/settings/change-password',
      icon: 'shield-checkmark'
    },
    {
      title: 'Umpan Balik',
      url: '/settings/feedback',
      icon: 'chatbubble-ellipses'
    }
  ];
  public defaultTime: string = transformDateTime(new Date()).toTime();
  public notifications: {
    moodTracker: { time: string, onSchedule: boolean },
    habitTracker: { time: string, onSchedule: boolean }
  } = {
      moodTracker: {
        time: '',
        onSchedule: false
      },
      habitTracker: {
        time: '',
        onSchedule: false
      }
    };

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const reminderTime = await this.notificationService.getReminderTime('mood-tracker');
    if (reminderTime) {
      this.notifications.moodTracker = {
        time: reminderTime,
        onSchedule: true
      }
    }
  }

  onTimeChanged(time: string) {
    this.notifications.moodTracker.time = time;
  }

  async onSelectTime() {
    if (this.notifications.moodTracker.onSchedule) {
      await this.notificationService.setReminderTime('mood-tracker', this.notifications.moodTracker.time);
      await this.notificationService.setLocalNotification();
    }
  }

  async onToggleNotifications(event: any) {
    if (event.detail.checked) {
      if (this.notifications.moodTracker.time !== '') {
        await this.notificationService.setReminderTime('mood-tracker', this.notifications.moodTracker.time);
        await this.notificationService.setLocalNotification();
        this.notifications.moodTracker.onSchedule = true;
      }
    } else {
      this.notifications.moodTracker.onSchedule = false;
    }
  }
}
