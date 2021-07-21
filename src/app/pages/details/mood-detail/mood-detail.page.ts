import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectMood } from 'src/app/store/selectors/moods.selectors';
import { updateMood } from 'src/app/store/actions/moods.actions';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Activity } from 'src/app/models/activity.model';
import { Emoticon, Mood } from 'src/app/models/mood.model';
import { MoodService } from 'src/app/services/mood/moods.service';

@Component({
  selector: 'app-mood-detail',
  templateUrl: './mood-detail.page.html',
  styleUrls: ['./mood-detail.page.scss'],
})
export class MoodDetailPage implements OnInit {
  private updateMoodListener: Subscription= null;
  public mood: Mood;
  private moodId: number;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private moodService: MoodService
  ) { }

  ngOnInit() {
    this.moodId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.store.select(selectMood({ Id: this.moodId })).subscribe(res => {
      this.mood= {
        ...res,
        timestamps: { ...res.timestamps },
        parameters: { ...res.parameters },
        activities: [...res.activities]
      };
    });
  }

  ionViewWillLeave() {
    this.updateMoodListener && this.updateMoodListener.unsubscribe();
  }

  pullRefresh(event) {
    this.store.select(selectMood({ Id: this.moodId })).subscribe(res => {
      this.mood= {
        ...res,
        timestamps: { ...res.timestamps },
        parameters: { ...res.parameters },
        activities: [...res.activities]
      };

      event && event.target.complete();
    });
  }

  onSelectDate(date: Date) {
    this.mood.timestamps.date= transformDateTime(new Date(date)).toISODate();
  }

  onSelectTime(time: string) {
    this.mood.timestamps.time= time;
  }

  onSelectEmoticon(emoticon: Emoticon) {
    this.mood.emoticon= emoticon;
  }

  onSelectActivities(activities: Activity[]) {
    this.mood.activities= activities;
  }

  async onUpdate() {
    this.store.dispatch(updateMood({ moodId: this.mood.Id, fields: this.mood }));

    const alert= await this.alertController.create({
      subHeader: 'Perbarui Mood',
      message: 'Berhasil menyimpan perubahan!',
      buttons: ['OK']
    });
    alert.present();
    
    //this.router.navigate(['/side-menu/tabs/moods']);
  }
}
