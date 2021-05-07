import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public pages: any[] = [
    {
      title: 'Pemicu',
			url: '/settings/triggers',
			icon: 'alert-circle'
    },
    {
      title: 'Notifikasi',
			url: '/settings/notifications',
			icon: 'notifications'
    },
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

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
  }

  toogleDarkMode(event) {
    if (event.detail.checked) {
      this.themeService.enableDarkTheme();
    } else {
      this.themeService.enableMainTheme();
    }
  }
}
