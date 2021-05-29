import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { ActivityCategory } from 'src/app/models/activityCategory';

@Component({
  selector: 'activity-category-list-item',
  templateUrl: './activity-category-list-item.component.html',
  styleUrls: ['./activity-category-list-item.component.scss'],
})
export class ActivityCategoryListItemComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;
  @ViewChild('activityCategoryTemplate', { static: true}) template;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}
