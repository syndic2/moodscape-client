import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss'],
})
export class ActivityListItemComponent implements OnInit {
  @Input() activity: Activity;
  @ViewChild('activityTemplate', { static: true}) template;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}
