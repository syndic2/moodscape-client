import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Activity } from 'src/app/models/activity.model';
import { Mood, MoodEmoticon } from 'src/app/models/mood.model';
import { fetchMoods, fetchMood, fetchUpdateMood } from 'src/app/store/actions/mood.actions';
import { getMoods, getMood } from 'src/app/store/selectors/mood.selectors';

@Component({
  selector: 'app-mood-detail',
  templateUrl: './mood-detail.page.html',
  styleUrls: ['./mood-detail.page.scss']
})
export class MoodDetailPage implements OnInit {
  public mood: Mood;
  private moodId: number;
  private subscriptions: Subscription;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.moodId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.subscriptions = new Subscription();

    const getMoodSubscription = this.store.select(getMood({ Id: this.moodId })).subscribe(res => {
      if (!res) {
        this.store.dispatch(fetchMood({ moodId: this.moodId }));
      } else {
        this.mood = {
          ...res,
          createdAt: { ...res?.createdAt },
          parameters: { ...res?.parameters }
        };
      }
    });
    this.subscriptions.add(getMoodSubscription);
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }

  pullRefresh(event) {
    const getMoodsSubscription = this.store.select(getMoods).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchMoods());
      }
    });
    this.subscriptions.add(getMoodsSubscription);

    this.store.dispatch(fetchMood({ moodId: this.moodId }));
    event.target.complete();
  }

  onSelectDate(date: Date | string) {
    this.mood.createdAt.date = transformDateTime(new Date(date)).toISODate();
  }

  onSelectTime(time: string) {
    this.mood.createdAt.time = time;
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.mood.emoticon = emoticon;
  }

  onSelectActivities(activities: Activity[]) {
    this.mood.activities = activities;
  }

  onUpdate() {
    delete this.mood.Id;
    this.store.dispatch(fetchUpdateMood({
      moodId: this.moodId,
      fields: { ...this.mood, activities: this.mood.activities.map(activity => activity.Id) }
    }));
  }
}
