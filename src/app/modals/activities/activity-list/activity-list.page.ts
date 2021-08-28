import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { getKeepedActivities } from 'src/app/store/selectors/activity.selectors';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  public activities: any[]= [];
  private activitiesSubscription: Subscription;
  public selectAll: boolean= false;

  constructor(private store: Store, private modalController: ModalController) { }
    
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activitiesSubscription= this.store.select(getKeepedActivities).pipe(
      map(res => res.map((activity, index) => ({ ...activity, isChecked: false }))
    )).subscribe(res => {
      this.activities= res;
    });
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSelectAll() {
    this.activities.forEach(object => object.isChecked= this.selectAll);
  }

  onCreate() {
    this.modalController.dismiss({ activities: this.activities.filter(activity => activity.isChecked).map(activity => activity.Id) });
  }
}
