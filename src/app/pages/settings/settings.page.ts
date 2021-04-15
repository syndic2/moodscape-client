import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

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
