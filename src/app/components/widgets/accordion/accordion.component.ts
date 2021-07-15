import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Animations } from 'src/app/animations/accordion';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: Animations
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @ViewChild('content') content: ElementRef;

  public isOpen: boolean= false;
  public contentScrollHeight: number= 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  onToogle() {
    this.isOpen= !this.isOpen;
    this.contentScrollHeight= this.content.nativeElement.scrollHeight;
  }
}
