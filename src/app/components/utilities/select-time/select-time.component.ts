import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';

@Component({
  selector: 'select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.scss'],
})
export class SelectTimeComponent implements OnInit {
  @Output() selectTimeEvent= new EventEmitter<string>();
  @ViewChild('selectTimeTemplate', { static: true }) template;

  public selectedTime: string= transformDateTime(new Date()).toTime();

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.selectTimeEvent.emit(this.selectedTime);
  }

  onTimeChanged(time: string) {
    this.selectedTime= time;
  }

  onSelectTime() {
    this.selectTimeEvent.emit(this.selectedTime);
  }
}
