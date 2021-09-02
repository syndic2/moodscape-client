import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
=======

import { UntilDestroy } from '@ngneat/until-destroy';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Activity } from 'src/app/models/activity.model';
import { Mood, MoodEmoticon } from 'src/app/models/mood.model';
<<<<<<< HEAD
import { fetchMood, fetchUpdateMood } from 'src/app/store/actions/mood.actions';
=======
import { fetchMoods, fetchMood, fetchUpdateMood } from 'src/app/store/actions/mood.actions';
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
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
<<<<<<< HEAD
  }

  ionViewWillEnter() {
    this.moodSubscription= this.store.select(getMood({ Id: this.moodId })).subscribe(res => {
      if (res !== null) {
        this.mood= {
          ...res,
          createdAt: { ...res?.createdAt },
          parameters: { ...res?.parameters }
        };
      }
    });
  }

  ionViewWillLeave() {
    this.moodSubscription && this.moodSubscription.unsubscribe();
  }

  pullRefresh(event) {
=======
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
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
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
