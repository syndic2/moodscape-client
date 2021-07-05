import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { selectActivityCategory } from 'src/app/store/selectors/user-activities.selectors';
import { ActivityCategory } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activity-category-detail',
  templateUrl: './activity-category-detail.page.html',
  styleUrls: ['./activity-category-detail.page.scss'],
})
export class ActivityCategoryDetailPage implements OnInit {
  public activityCategory$: Observable<ActivityCategory>= null;
  private activityCategoryId: number;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activityCategoryId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activityCategory$= this.store.select(selectActivityCategory({ Id: this.activityCategoryId }));
  }
}
