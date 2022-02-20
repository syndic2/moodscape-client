import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';
import { Theme } from 'src/app/models/theme.model';

const THEME_KEY = 'selected-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = '.main-theme';
  //public isDarkMode: boolean= false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private storage: Storage,
    private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  enableMainTheme() {
    //this.isDarkMode= false;
    this.renderer.removeClass(this.document.body, 'main-theme');
  }

  enableDarkTheme() {
    //this.isDarkMode= true;
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  private createThemeClassName(name: string): string {
    return `${name.toLowerCase().split(' ').join('-')}-theme`;
  }

  private createThemeStyle(theme: Theme): string {
    return `
      .${this.createThemeClassName(theme.name)} {
        --ion-color-primary: ${theme.colors.primary};
        --ion-color-primary-rgb: ${theme.colors.primaryRgb};
        --ion-color-primary-contrast: ${theme.colors.primaryContrast};
        --ion-color-primary-contrast-rgb: ${theme.colors.primaryContrastRgb};
        --ion-color-primary-shade: ${theme.colors.primaryShade};
        --ion-color-primary-tint: ${theme.colors.primaryTint};
      }
    `;
  }

  applyTheme() {
    this.storage.get(THEME_KEY).then(value => this.renderer.addClass(this.document.body, value));
  }

  setTheme(theme: Theme) {
    this.storage.get(THEME_KEY).then(value => {
      this.renderer.removeClass(this.document.body, value)

      if (theme.Id === 'none') {
        this.renderer.addClass(this.document.body, '.main-theme');
        this.storage.set(THEME_KEY, '.main-theme');
      } else {
        const themeName = this.createThemeClassName(theme.name);

        this.renderer.addClass(this.document.body, themeName);
        this.storage.set(THEME_KEY, themeName);
      }
    });
  }

  getThemes(): Observable<any> {
    const query = gqlCompress(`
      query {
        getActiveThemes {
          Id,
          name,
          colors {
            primary,
            primaryRgb,
            primaryContrast,
            primaryContrastRgb,
            primaryShade,
            primaryTint
          },
          isActive
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      headers: {
        skipLoading: 'true'
      }
    }).pipe(
      map((res: any) => {
        const themes: Theme[] = res.data.getActiveThemes;
        const style = this.document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '';

        themes.forEach(theme => style.innerHTML += this.createThemeStyle(theme));
        this.document.head.appendChild(style);

        return themes;
      })
    );
  }
}
