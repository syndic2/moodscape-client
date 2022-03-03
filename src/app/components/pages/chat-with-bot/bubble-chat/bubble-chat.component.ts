import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'bubble-chat',
  templateUrl: './bubble-chat.component.html',
  styleUrls: ['./bubble-chat.component.scss'],
})
export class BubbleChatComponent implements OnInit {
  @Input() message: any;
  @Output() selectMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('bubbleChat', { static: true }) template: any;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSelectMessage() {
    this.selectMessageEvent.emit(this.message);
  }
}
