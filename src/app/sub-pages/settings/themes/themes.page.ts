import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { Subscription } from 'rxjs';

import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { Theme } from 'src/app/models/theme.model';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {
  @ViewChildren('themeCard') themeCards: QueryList<ElementRef>;

  public themes: Theme[]= [
    {
      Id: 'none',
      name: 'Default',
      colors: {
        primary: '#41c1dd',
        primaryRgb: '65, 193, 221',
        primaryContrast: '#ffffff',
        primaryContrastRgb: '255, 255, 255',
        primaryShade: '#39aac2',
        primaryTint: '#54c7e0'
      },
      isActive: true
    }
  ];
  private getThemesSubscription: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getThemesSubscription= this.themeService.getThemes().subscribe(res => {
      this.themes= [...this.themes, ...res];
    });
  }

  ionViewWillLeave() {
    this.getThemesSubscription && this.getThemesSubscription.unsubscribe();
  }

  onSelectTheme(index: number) {
    poppingAnimation('theme-card', this.themeCards.get(index)).play();
    this.themeService.setTheme(this.themes[index]);
  }
}
