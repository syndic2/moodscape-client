import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActivityIcon } from 'src/app/models/activity.model';
import { fetchActivityIcons } from 'src/app/store/actions/activity.actions';
import { getActivityIcons } from 'src/app/store/selectors/activity.selectors';

@Component({
  selector: 'app-activity-icon-list',
  templateUrl: './activity-icon-list.page.html',
  styleUrls: ['./activity-icon-list.page.scss'],
})
export class ActivityIconListPage implements OnInit {
  public activityIcons$: Observable<ActivityIcon[]>= this.store.select(getActivityIcons);
  private selectedIcon: string;

  constructor(private store: Store, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchActivityIcons({}));
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSelectIcon(activityIcon: ActivityIcon) {
    this.selectedIcon= activityIcon.name;
  }

  onChoose() {
    this.modalController.dismiss({ icon: this.selectedIcon });
  }
}
