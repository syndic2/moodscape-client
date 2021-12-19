import { state, style, animate, trigger, transition } from '@angular/animations';

export const Animations = [
  trigger('collapse', [
    state('default', style({
      maxHeight: '0',
      overflow: 'hidden',
    })),
    state('collapsed', style({
      maxHeight: '{{ scrollHeight }}px',
      overflow: 'hidden'
    }), {
      params: {
        scrollHeight: 0
      }
    }),
    transition('default <=> collapsed', animate('100ms'))
  ]),
  trigger('rotate', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(180deg)' })),
    transition('default <=> rotated', animate('100ms'))
  ])
];
