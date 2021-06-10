import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { select ,Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivityCategory } from 'src/app/models/activities/activity-category.model';
import { selectActivityCategoryList } from 'src/app/store/selectors/user-activities.selectors';

@Component({
  selector: 'app-activity-category-list',
  templateUrl: './activity-category-list.page.html',
  styleUrls: ['./activity-category-list.page.scss'],
})
export class ActivityCategoryListPage implements OnInit {
  @Input() currentActivityCategory: ActivityCategory;

  public activityCategoryList$: Observable<any[]>= this.store.pipe(
    select(selectActivityCategoryList),
    map(res => this.currentActivityCategory ? res.filter(object => object.Id !== this.currentActivityCategory.Id) : res)
  );

  constructor(private store: Store, private modalController: ModalController) { }

  ngOnInit() {
  }

  onClose() {
    this.modalController.dismiss();
  }

  onSelectCategory(activityCategory: ActivityCategory) {
    this.modalController.dismiss({ toCategoryId: activityCategory.Id });
  }
}
