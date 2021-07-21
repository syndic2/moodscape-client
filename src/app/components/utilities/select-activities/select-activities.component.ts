import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectUnkeepedActivities,
  selectKeepedActivities,
  selectCheckedUnkeepedActivities,
  selectCheckedKeepedActivities
} from 'src/app/store/selectors/activities.selectors';
import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { ActivityCategoryOptionsPopoverComponent } from '../../pages/moods/activity-category-options-popover/activity-category-options-popover.component';

@Component({
  selector: 'select-activities',
  templateUrl: './select-activities.component.html',
  styleUrls: ['./select-activities.component.scss'],
})
export class SelectActivitiesComponent implements OnInit {
  @Input() extraButtons: boolean= true;
  @Input() selectedActivities: Activity[]= [];
  @Output() selectActivitiesEvent= new EventEmitter<Activity[]>();

  public activityCategories$: Observable<ActivityCategory[] | any[]>= this.store.select(selectUnkeepedActivities);
  public keepedActivities$: Observable<Activity[] | any[]>= this.store.select(selectKeepedActivities);

  constructor(private store: Store, private popoverController: PopoverController) { }

  ngOnInit() {
    if (this.selectedActivities.length) {
      this.activityCategories$= this.store.select(selectCheckedUnkeepedActivities({ selectedActivities: this.selectedActivities }));
      this.keepedActivities$= this.store.select(selectCheckedKeepedActivities({ selectedActivities: this.selectedActivities }));
    }
  }

  async openPopover(event, activityCategory?: ActivityCategory) {
    const popover= await this.popoverController.create({
      event: event,
      component: ActivityCategoryOptionsPopoverComponent,
      componentProps: {
        ...activityCategory && { activityCategory: activityCategory }
      },
      translucent: true
    });

    popover.present();
  }

  onSelectActivity(event) {
    const activity: Activity= JSON.parse(event.target.value);

    if (event.target.checked) {
      this.selectedActivities= [...this.selectedActivities, activity];
    } else {
      this.selectedActivities= [...this.selectedActivities.filter(object => object.Id !== activity.Id)];
    }

    this.selectActivitiesEvent.emit(this.selectedActivities);
  }
}
