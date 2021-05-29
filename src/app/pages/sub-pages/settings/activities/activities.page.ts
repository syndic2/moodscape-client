import { Component, OnInit, ViewChild } from '@angular/core';

import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

import { Subscription } from 'rxjs';

import { Activity } from 'src/app/models/activity';
import { ActivityCategory } from 'src/app/models/activityCategory';
import { UserActivitiesService } from 'src/app/services/user-activities/user-activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public activityCategories: ActivityCategory[]= [];
  public activityWithoutCategory: Activity= null;
  private getActivitiesListener: Subscription= null;

  constructor(private userActivitiesService: UserActivitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getActivitiesListener= this.userActivitiesService.getActivities().subscribe(res => {
      this.activityCategories= res.activityCategories;
      this.activityWithoutCategory= res.activityWithoutCategory;
    });
  }

  ionViewWillLeave() {
    this.getActivitiesListener && this.getActivitiesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.getActivitiesListener= this.userActivitiesService.getActivities().subscribe(res => {
      this.activityCategories= res.activityCategories;
      this.activityWithoutCategory= res.activityWithoutCategory;

      event && event.target.complete();
    });
  }

  reorderCategory(event: CustomEvent<ItemReorderEventDetail>) {
    event.detail.complete();
  }
}
