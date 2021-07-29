import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @Input() selectedDate: Date= new Date();
  @Input() enabledDate: number;
  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  public viewTitle: string;
  public mode: any= 'month';
  public dateFormatter= {
    formatMonthViewDayHeader: function(date: Date) {
      const days: string[]= ['M', 'S', 'S', 'R', 'K', 'J', 'S']

      return days[date.getDay()];
    },
  };
  public eventSource= [];
  public markDisabled;
  public currentDate: Date;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.enabledDate) {
      this.markDisabled= (date: Date): boolean => {
        return this.enabledDate !== -1 && date.getDay() !== this.enabledDate;
      }
    }

    this.currentDate= this.selectedDate;
  }

  close() {
    this.modalController.dismiss();
  }

  prev() {
    this.calendar.slidePrev();
  }

  next() {
    this.calendar.slideNext();
  }

  onTitleChanged(title: string) {
    this.viewTitle= title;
  }
  
  //onCurrentDateChanged(date: Date) {
  //  this.currentDate= date;
  //}

  onTimeSelected(event) {
    const date: Date= event.selectedTime;

    if (!this.enabledDate) {
      this.selectedDate= date;
    } else {
      this.selectedDate= this.enabledDate !== -1 && this.enabledDate !== date.getDay() ? this.selectedDate : date;
    }
  }

  onSelectDate() {
    this.modalController.dismiss({ selectedDate: this.selectedDate });
  }
}
