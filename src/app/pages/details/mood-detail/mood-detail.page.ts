import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Activity } from 'src/app/models/activity.model';
import { Mood, MoodEmoticon } from 'src/app/models/mood.model';
import { fetchMoods, fetchMood, fetchUpdateMood } from 'src/app/store/actions/mood.actions';
import { getMood } from 'src/app/store/selectors/mood.selectors';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-mood-detail',
  templateUrl: './mood-detail.page.html',
  styleUrls: ['./mood-detail.page.scss'],
})
export class MoodDetailPage implements OnInit {
  public mood: Mood;
  public moodSubscription: Subscription;
  private moodId: number;
  public isLoading: boolean= true;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.moodId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchMood({ moodId: this.moodId }));
    this.moodSubscription= this.store.select(getMood({ Id: this.moodId })).subscribe(res => {
      if (res) {
        this.mood= {
          ...res,
          createdAt: { ...res?.createdAt },
          parameters: { ...res?.parameters }
        };
        this.isLoading= false;
      }
    });
  }

  pullRefresh(event) {
    this.store.dispatch(fetchMoods());
    this.store.dispatch(fetchMood({ moodId: this.moodId }));
    event.target.complete();
  }

  onSelectDate(date: Date) {
    this.mood.createdAt.date= transformDateTime(new Date(date)).toISODate();
  }

  onSelectTime(time: string) {
    this.mood.createdAt.time= time;
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.mood.emoticon= emoticon;
  }

  onSelectActivities(activities: Activity[]) {
    this.mood.activities= activities;
  }

  onUpdate() {
    delete this.mood.Id;
    this.store.dispatch(fetchUpdateMood({ 
      moodId: this.moodId, 
      fields:  { ...this.mood, activities: this.mood.activities.map(activity => activity.Id) }
    }));
  }
}
