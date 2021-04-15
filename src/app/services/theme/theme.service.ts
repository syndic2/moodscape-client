import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  public isDarkMode: boolean= false;

  constructor(@Inject(DOCUMENT) private document: Document, private rendererFactory: RendererFactory2) {
    this.renderer= this.rendererFactory.createRenderer(null, null);
  }

  enableMainTheme() {
    this.isDarkMode= false;
    this.renderer.removeClass(this.document.body, 'dark-theme');
  }

  enableDarkTheme() {
    this.isDarkMode= true;
    this.renderer.addClass(this.document.body, 'dark-theme');
  }
}
