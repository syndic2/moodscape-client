import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

import Chart from 'chart.js/auto';

import { monthNames, transformDateTime } from 'src/app/utilities/helpers';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { getMoodsByMonth, getMoodsByDate, getMoodsChartByMonthYear } from 'src/app/store/selectors/mood.selectors';
import { SelectCalendarMonthPage } from 'src/app/modals/select-calendar-month/select-calendar-month.page';
import { SelectCalendarYearPage } from 'src/app/modals/select-calendar-year/select-calendar-year.page';

@Component({
  selector: 'mood-statistics',
  templateUrl: './mood-statistics.component.html',
  styleUrls: ['./mood-statistics.component.scss'],
})
export class MoodStatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas: ElementRef;

  public monthNames: (month: number) => string = monthNames;
  public moodsByMonth: any= { moods: [], moodsCount: null };
  private lineChart: any;

  private selectedMonthYearSubject: BehaviorSubject<{ month, year }>= new BehaviorSubject({ month: new Date().getMonth(), year: new Date().getFullYear() });

  private selectedMonthYearSubscription: Subscription;
  private getMoodsByMonthSubscription: Subscription;
  private getMoodsByDate: Subscription;
  private getMoodsChartSubscription: Subscription;

  constructor(private store: Store, private modalController: ModalController) { }

  ngOnInit() {
    this.selectedMonthYearSubscription= this.selectedMonthYearSubject.subscribe(res => {
      this.getMoodsChartSubscription= this.store.select(getMoodsChartByMonthYear(res.month, res.year)).subscribe(res => {
        if (this.lineChart) {
          if (!res) {
            this.lineChart.data.labels= [];
            this.lineChart.data.datasets[0].data= [];
            this.lineChart.update();
          } else {
            this.lineChart.data.labels= [];
            this.lineChart.data.datasets[0].data= [];
  
            res.moodAverageByRangeDate.forEach(mood => {
              this.lineChart.data.labels.push(mood.startDate);
              this.lineChart.data.datasets[0].data.push(mood.average);
            });
  
            this.lineChart.update();
          }
        }
      });
    });
  }

  ngAfterViewInit() {
    this.initializeCharts();
  }

  ngOnDestroy() {
    this.selectedMonthYearSubscription && this.selectedMonthYearSubscription.unsubscribe();
    this.getMoodsByMonthSubscription && this.getMoodsByMonthSubscription.unsubscribe();
    this.getMoodsByDate && this.getMoodsByDate.unsubscribe();
    this.getMoodsChartSubscription && this.getMoodsChartSubscription.unsubscribe();
  }

  get selectedMonth() {
    return this.selectedMonthYearSubject.value.month;
  }

  get selectedYear() {
    return this.selectedMonthYearSubject.value.year;
  }

  initializeCharts() {
    this.lineChart= new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28],
        datasets: [
          {
            fill: false,
            borderDash: [],
            borderDashOffset: 0.0,
            borderCapStyle: 'butt',
            borderJoinStyle: 'miter',
            borderColor: '#5b21b6',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#fff',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false
            },
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    });
  }

  onSelectCalendarDateChanged(date: Date) {
    this.getMoodsByMonthSubscription= this.store.select(getMoodsByMonth(date.getMonth(), date.getFullYear())).subscribe(res => {      
      this.moodsByMonth.moods= [...res.moods].map((mood, index) => ({
        title: mood.createdAt.date,
        startTime: new Date(mood.createdAt.date),
        endTime: new Date(mood.createdAt.date),
        allDay: false
      }));
      this.moodsByMonth.moodsCount= { ...res.moodsCount };
    });
  }

  onViewMoodsByDate(date: Date) {
    this.getMoodsByDate= this.store.select(getMoodsByDate(transformDateTime(date).toISODate())).subscribe(res => {
      if (res.moods.length) {
        this.store.dispatch(navigateGo({ 
          path: ['/moods/list-by-date'], 
          extras: { 
            state: {
              date: date, 
              moods: [...res.moods],
              moodsCount: { ...res.moodsCount } 
            } 
          } 
        }));
      }
    });
  }

  async onSelectLineChartMonth() {
    const modal= await this.modalController.create({ 
      component: SelectCalendarMonthPage,
      componentProps: {
        selectedMonth: this.selectedMonthYearSubject.value.month
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedMonth !== undefined) {
      this.selectedMonthYearSubject.next({ ...this.selectedMonthYearSubject.value, month: data.selectedMonth });
    } 
  }

  async onSelectLineChartYear() {
    const modal= await this.modalController.create({ 
      component: SelectCalendarYearPage,
      componentProps: {
        selectedYear: this.selectedMonthYearSubject.value.year
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedYear !== undefined) {
      this.selectedMonthYearSubject.next({ ...this.selectedMonthYearSubject.value, year: data.selectedYear });
    } 
  } 
}
