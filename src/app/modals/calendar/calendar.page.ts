import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild, TemplateRef, ElementRef } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

import { monthNames } from 'src/app/utilities/helpers';
import { SelectCalendarMonthPage } from '../select-calendar-month/select-calendar-month.page';
import { SelectCalendarYearPage } from '../select-calendar-year/select-calendar-year.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit, AfterViewInit {
  @Input() isStatistics: boolean= false;
  @Input() selectedDate: Date= new Date();
  @Input() enabledDate: number;
  @Input() disablePastDate: boolean= false;
  @Input() eventSource: any= [];
  @Input() monthViewTemplate: TemplateRef<any>;
  //@Input() monthViewCurrentColor= { text: 'white', background: '#00FF00' };
  //@Input() monthViewSelectedColor= { text: 'white', background: '#5B21B6' };
  @Output() selectDateChangedEvent: EventEmitter<Date>= new EventEmitter();
  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  public viewTitle: string;
  public mode: any= 'month';
  public dateFormatter= {
    formatMonthViewDayHeader: function(date: Date) {
      const days: string[]= ['M', 'S', 'S', 'R', 'K', 'J', 'S']

      return days[date.getDay()];
    },
  };
  public markDisabled;
  public currentDate: Date;
  public selectedMonth: number= new Date().getMonth();
  public selectedYear: number= new Date().getFullYear();
  public monthNames: (month: number) => string = monthNames;
  public hideModal: boolean= false;

  constructor(private elementRef: ElementRef, private modalController: ModalController) { }

  ngOnInit() {
    this.currentDate= this.selectedDate;

    //if (this.enabledDate) {
    //  this.markDisabled= (date: Date): boolean => {
    //    return this.enabledDate !== -1 && date.getDay() !== this.enabledDate;
    //  }
    //}

    if (this.disablePastDate) {
      this.markDisabled= (date: Date): boolean => {
        return date < new Date();
      }
    }
  }

  ngAfterViewInit() {
    if (this.isStatistics) {
      const monthViewCurrent: HTMLElement= this.elementRef.nativeElement.querySelector('.monthview-current');
      monthViewCurrent.classList.remove('monthview-current');
    }
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
  
  async onSelectMonth() {
    if (!this.isStatistics) this.hideModal= true;

    const modal= await this.modalController.create({
      component: SelectCalendarMonthPage,
      componentProps: {
        selectedMonth: this.selectedMonth
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedMonth !== undefined) {
      this.selectedMonth= data.selectedMonth;
      this.selectedDate.setMonth(data.selectedMonth);
      this.currentDate= this.selectedDate;
      this.hideModal= false;
    } else {
      this.hideModal= false;
    }
  }

  async onSelectYear() {
    if (!this.isStatistics) this.hideModal= true;

    const modal= await this.modalController.create({
      component: SelectCalendarYearPage,
      componentProps: {
        selectedYear: this.selectedYear
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedYear) {
      this.selectedYear= data.selectedYear;
      this.selectedDate.setFullYear(data.selectedYear);
      this.currentDate= this.selectedDate;
      this.hideModal= false;
    } else {
      this.hideModal= false;
    }
  }

  onCurrentDateChanged(date: Date) {
    if (this.isStatistics) this.selectDateChangedEvent.emit(date);
  }

  onTimeSelected(event) {
    const date: Date= event.selectedTime;

    //if (!this.enabledDate) {
    //  this.selectedDate= date;
    //} else {
    //  this.selectedDate= this.enabledDate !== -1 && this.enabledDate !== date.getDay() ? this.selectedDate : date;
    //}

    if (!this.disablePastDate) {
      this.selectedDate= date;
    } else {
      this.selectedDate= date > new Date() ? date : this.selectedDate;
    }

    if (this.isStatistics) {
      const monthViewCurrent: HTMLElement= this.elementRef.nativeElement.querySelector('.monthview-current');
      monthViewCurrent?.classList?.remove('monthview-current');
    }
  }

  onSelectDate() {
    this.modalController.dismiss({ selectedDate: this.selectedDate });
  }
}
