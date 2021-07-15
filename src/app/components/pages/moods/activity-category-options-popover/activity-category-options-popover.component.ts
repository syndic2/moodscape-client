import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { PopoverController } from '@ionic/angular';

import { ActivityCategory } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activity-category-options-popover',
  templateUrl: './activity-category-options-popover.component.html',
  styleUrls: ['./activity-category-options-popover.component.scss'],
})
export class ActivityCategoryOptionsPopoverComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;

  private extrasData: NavigationExtras= {
    state: {
      redirectTo: this.router.url
    }
  }

  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  onAddActivity() {
    this.extrasData.state.activityCategory= this.activityCategory;
    this.popoverController.dismiss();
    this.router.navigate(['/settings/activities/create-activity'], this.extrasData);
  }

  onAddCategory() {
    this.popoverController.dismiss();
    this.router.navigate(['/settings/activities/create-activity-category']);
  }

  onManageCategory() {
    this.popoverController.dismiss();
    this.router.navigate(['/settings/activities']);
  }
}
