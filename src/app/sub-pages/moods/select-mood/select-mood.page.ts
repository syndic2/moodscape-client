import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { Store } from '@ngrx/store';

import { transformDateTime } from 'src/app/utilities/helpers';
import { MoodEmoticon } from 'src/app/models/mood.model';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { showAlert } from 'src/app/store/actions/application.actions';

@Component({
  selector: 'app-select-mood',
  templateUrl: './select-mood.page.html',
  styleUrls: ['./select-mood.page.scss'],
})
export class SelectMoodPage implements OnInit {
  public selectedDate: Date;
  public selectedTime: string;
  public selectedEmoticon: MoodEmoticon;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSelectDate(date: Date) {
    this.selectedDate= date;
  }

  onSelectTime(time: string) {
    this.selectedTime= time;
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.selectedEmoticon= emoticon;
  }

  onNext() {
    if (!this.selectedDate || !this.selectedTime || !this.selectedEmoticon) {
      this.store.dispatch(showAlert({
        options: { message: 'Data tidak boleh ada yang kosong!', buttons: ['OK'] }
      }));
    } else {
      const navigationExtras: NavigationExtras= {
        state: {
          emoticon: this.selectedEmoticon,
          createdAt: {
            date: transformDateTime(this.selectedDate).toISODate(),
            time: this.selectedTime
          }
        }
      };
      this.store.dispatch(navigateGo({ path: ['/moods/create/step-2'], extras: navigationExtras }))
    }
  }
}
