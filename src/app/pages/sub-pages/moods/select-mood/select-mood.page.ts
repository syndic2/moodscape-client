import { Component, OnInit } from '@angular/core';

import { NavController, AlertController, ModalController } from '@ionic/angular';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Emoticon } from 'src/app/models/mood.model';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'app-select-mood',
  templateUrl: './select-mood.page.html',
  styleUrls: ['./select-mood.page.scss'],
})
export class SelectMoodPage implements OnInit {
  public selectedDate: Date= new Date();
  public selectedTime: string= transformDateTime(new Date()).toTime();
  public selectedEmoticon: Emoticon;

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async onSelectDate() {
    const modal= await this.modalController.create({
      component: CalendarPage,
      componentProps: {
        selectedDate: this.selectedDate
      },
      cssClass: 'calendar-modal'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.selectedDate) {
      this.selectedDate= data.selectedDate;
    }
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
      this.navController.navigateForward('/side-menu/tabs/moods/create-mood', {
        state: {
          date: transformDateTime(this.selectedDate).toISODate(),
          time: this.selectedTime,
          emoticon: this.selectedEmoticon
        }
      });
    }
  }
}
