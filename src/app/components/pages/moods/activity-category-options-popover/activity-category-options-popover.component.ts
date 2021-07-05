import { Component, OnInit, Input } from '@angular/core';

import { ActivityCategory } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activity-category-options-popover',
  templateUrl: './activity-category-options-popover.component.html',
  styleUrls: ['./activity-category-options-popover.component.scss'],
})
export class ActivityCategoryOptionsPopoverComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;

  constructor() { }

  ngOnInit() {}

  onAddActivity() {

  }

  onAddCategory() {

  }

  onManageCategory() {
    
  }
}
