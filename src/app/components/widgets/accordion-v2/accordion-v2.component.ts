import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accordion-v2',
  templateUrl: './accordion-v2.component.html',
  styleUrls: ['./accordion-v2.component.scss'],
})
export class AccordionV2Component implements OnInit {
  public isOpen: boolean = false;

  constructor() { }

  ngOnInit() { }

  toogle(): void {
    this.isOpen = !this.isOpen;
  }
}
