import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';

@Component({
  selector: 'select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.scss'],
})
export class SelectTimeComponent implements OnInit {
  @Input() selectedTime: string= transformDateTime(new Date()).toTime();
  @Output() selectTimeEvent= new EventEmitter<string>();
  @ViewChild('selectTimeTemplate', { static: true }) template;

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
