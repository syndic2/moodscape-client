import { ElementRef } from "@angular/core";

import { createAnimation, Animation } from "@ionic/angular";

export const poppingAnimation= (name: string, element: ElementRef): Animation => {
  return createAnimation(`${name}-popping`)
    .addElement(element.nativeElement)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(0.85)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    .easing('ease-out')
    .duration(150);
};

export const collapseAnimation= (name: string, element: ElementRef): Animation => {
  return createAnimation(`${name}-collapse`)
    .addElement(element.nativeElement)
    .fromTo('height', '0', `${element.nativeElement.scrollHeight}px`)
    .easing('ease-out')
    .duration(150);
};