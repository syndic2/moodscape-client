import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { createMood } from 'src/app/store/actions/user-moods.actions';

import { selectUserActivities, selectKeepedActivities } from 'src/app/store/selectors/user-activities.selectors';
import { Activity, ActivityCategory } from 'src/app/models/activity.model';
import { ActivityCategoryOptionsPopoverComponent } from 'src/app/components/pages/moods/activity-category-options-popover/activity-category-options-popover.component';

@Component({
  selector: 'app-create-detail-mood',
  templateUrl: './create-detail-mood.page.html',
  styleUrls: ['./create-detail-mood.page.scss'],
})
export class CreateDetailMoodPage implements OnInit {
  public activityCategories$: Observable<ActivityCategory[]>= this.store.select(selectUserActivities);
  public keepedActivities$: Observable<Activity[]>= this.store.select(selectKeepedActivities);
  private fields;
  private checkedActivities: Activity[]= [];

  constructor(
    private store: Store,
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fields= this.router.getCurrentNavigation().extras.state;
    }
  }

  async openPopover(event, activityCategory: ActivityCategory) {
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

  onCheckActivity(event) {
    this.checkedActivities.push(JSON.parse(event.target.value));
  }

  onSubmit(form: NgForm) {
    this.fields= { Id: -3, ...this.fields, ...{
        ...form.value,
        activities: this.checkedActivities
      }
    };
    this.store.dispatch(createMood({ mood: this.fields}));
    this.router.navigate(['/side-menu/tabs/moods']);
  }
}
