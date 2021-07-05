import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { state, style, animate, trigger, transition } from '@angular/animations';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('collapse', [
      state('default', style({
        height: '0',
        overflow: 'hidden',
      })),
      state('collapsed', style({
        overflow: 'hidden'
      })),
      transition('default <=> collapsed', animate('100ms ease-out'))
    ]),
    trigger('rotate', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default <=> rotated', animate('100ms'))
    ])
  ]
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() title: string;

  public isOpen: boolean= false;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {

  }
  
  onToogle() {
    this.isOpen= !this.isOpen;
  }
}
