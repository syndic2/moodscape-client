import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Emoticon } from 'src/app/models/mood.model';

@Component({
  selector: 'app-select-mood',
  templateUrl: './select-mood.page.html',
  styleUrls: ['./select-mood.page.scss'],
})
export class SelectMoodPage implements OnInit {
  public selectedDate: Date;
  public selectedTime: string;
  public selectedEmoticon: Emoticon;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  onSelectDate(date: Date) {
    this.selectedDate= date;
  }

  onSelectTime(time: string) {
    this.selectedTime= time;
  }

  onSelectEmoticon(emoticon: Emoticon) {
    this.selectedEmoticon= emoticon;
  }

  async onNext() {
    if (!this.selectedDate || !this.selectedTime || !this.selectedEmoticon) {
      const alert= await this.alertController.create({
        message: 'Data tidak boleh ada yang kosong!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      const navigationExtras: NavigationExtras= {
        state: {
          emoticon: this.selectedEmoticon,
          timestamps: {
            date: transformDateTime(this.selectedDate).toISODate(),
            time: this.selectedTime
          }
        }
      };
      this.router.navigate(['/side-menu/tabs/moods/create-mood'], navigationExtras);
    }
  }
}
