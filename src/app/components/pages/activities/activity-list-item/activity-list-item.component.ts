import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { ActivityPopoverComponent } from '../activity-popover/activity-popover.component';

@Component({
  selector: 'activity-list-item',
  templateUrl: './activity-list-item.component.html',
  styleUrls: ['./activity-list-item.component.scss'],
})
export class ActivityListItemComponent implements OnInit {
  @Input() activity: Activity;
  @Input() activityCategory: ActivityCategory;
  @Input() forReorder: boolean= false;
  @ViewChild('activityTemplate', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef, private popoverController: PopoverController) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  async openPopover(event) {
    const popover= await this.popoverController.create({
      event: event,
      component: ActivityPopoverComponent,
      componentProps: {
        activity: this.activity,
        ...this.activityCategory && { activityCategory: this.activityCategory},
      }
    });
    popover.present();
  }
}
