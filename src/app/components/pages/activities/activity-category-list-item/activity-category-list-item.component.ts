import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { ActivityCategory } from 'src/app/models//activity.model';
import { ActivityCategoryPopoverComponent } from '../activity-category-popover/activity-category-popover.component';

@Component({
  selector: 'activity-category-list-item',
  templateUrl: './activity-category-list-item.component.html',
  styleUrls: ['./activity-category-list-item.component.scss'],
})
export class ActivityCategoryListItemComponent implements OnInit {
  @Input() activityCategory: ActivityCategory;
  @Input() forReorder: boolean= false;
  @ViewChild('activityCategoryTemplate', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef, private popoverController: PopoverController) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  async openPopover(event) {
    const popover= await this.popoverController.create({
      event: event,
      component: ActivityCategoryPopoverComponent,
      componentProps: { activityCategory: this.activityCategory },
      translucent: true
    });
    
    popover.present();
  }
}
