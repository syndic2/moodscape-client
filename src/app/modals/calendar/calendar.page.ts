import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @Input() selectedDate: Date;
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
  public currentDate: Date;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
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

  onCurrentDateChanged(date: Date) {
    this.currentDate= date;
  }

  onTimeSelected(event) {
    this.selectedDate= event.selectedTime;
  }

  onSelectDate() {
    this.modalController.dismiss({ selectedDate: this.selectedDate });
  }
}
