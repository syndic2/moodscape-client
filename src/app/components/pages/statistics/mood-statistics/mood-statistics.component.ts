import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Chart from 'chart.js/auto';

import { monthNames, transformDateTime } from 'src/app/utilities/helpers';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchMoods, fetchMoodsChart } from 'src/app/store/actions/mood.actions';
import { getMoods, getMoodsByMonth, getMoodsByDate, getMoodsChartByMonthYear, getMoodsTotalCount } from 'src/app/store/selectors/mood.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SelectCalendarMonthPage } from 'src/app/modals/select-calendar-month/select-calendar-month.page';
import { SelectCalendarYearPage } from 'src/app/modals/select-calendar-year/select-calendar-year.page';

@Component({
  selector: 'mood-statistics',
  templateUrl: './mood-statistics.component.html',
  styleUrls: ['./mood-statistics.component.scss'],
})
export class MoodStatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas: ElementRef;
  @ViewChild('doughnutChartCanvas', { static: false }) doughnutChartCanvas: ElementRef;

  public monthNames: (month: number) => string = monthNames;
  public moodsByMonth= { moods: [], moodsCount: null };
  public lineChart;
  public doughnutChart;

  private calendarDateClicked: boolean= false;
  private calendarPrevNextSubject: BehaviorSubject<Date>= new BehaviorSubject(new Date());
  private selectedMonthYearSubject: BehaviorSubject<{ month, year }>= new BehaviorSubject({ month: new Date().getMonth(), year: new Date().getFullYear() });

  private calendarPrevNextSubscription: Subscription;
  private selectedMonthYearSubscription: Subscription;
  private getMoodsSubscription: Subscription;
  private getMoodsByMonthSubscription: Subscription;
  private getMoodsByDate: Subscription;
  private getMoodsChartSubscription: Subscription;
  private getMoodsTotalCountSubscription: Subscription;

  constructor(
    private store: Store, 
    private modalController: ModalController, 
    private cdRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.store.dispatch(fetchMoodsChart());
    
    this.getMoodsSubscription= this.store
      .select(getMoods)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchMoods());
      }
    });

    this.calendarPrevNextSubscription= this.calendarPrevNextSubject.subscribe(value => {
      this.getMoodsByMonthSubscription= this.store
        .select(getMoodsByMonth(value.getMonth(), value.getFullYear()))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {           
        this.moodsByMonth.moods= [...res.moods].map((mood, index) => ({
          title: mood.createdAt.date,
          startTime: new Date(mood.createdAt.date),
          endTime: new Date(mood.createdAt.date),
          allDay: false
        }));
        this.moodsByMonth.moodsCount= { ...res.moodsCount };
      });
    });
  }

  ngAfterViewInit() {
    this.initializeCharts();

    this.selectedMonthYearSubscription= this.selectedMonthYearSubject.subscribe(res => {
      this.getMoodsChartSubscription= this.store
        .select(getMoodsChartByMonthYear(res.month, res.year))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
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
      });
    });

    this.getMoodsTotalCountSubscription= this.store
      .select(getMoodsTotalCount)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (res.gembira === 0 && res.senang === 0 && res.netral === 0 && res.sedih === 0 && res.buruk === 0) {
        this.doughnutChart.data.datasets[0].data= [];
        this.doughnutChart.update();
      } else {
        this.doughnutChart.data.datasets[0].data= [];

        Object.entries(res).forEach(([key, value]) => {
          this.doughnutChart.data.datasets[0].data.push(value);
        });

        this.doughnutChart.update();
      }
    });

    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.calendarPrevNextSubscription && this.calendarPrevNextSubscription.unsubscribe();
    this.selectedMonthYearSubscription && this.selectedMonthYearSubscription.unsubscribe();
    this.getMoodsSubscription && this.getMoodsSubscription.unsubscribe();
    this.getMoodsByMonthSubscription && this.getMoodsByMonthSubscription.unsubscribe();
    this.getMoodsByDate && this.getMoodsByDate.unsubscribe();
    this.getMoodsChartSubscription && this.getMoodsChartSubscription.unsubscribe();
    this.getMoodsTotalCountSubscription && this.getMoodsTotalCountSubscription.unsubscribe();
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
            borderColor: '#5B21B6',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#FFF',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              drawBorder: false
            }
          },
          y: {
            grid: {
              drawBorder: false
            },
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    });

    this.doughnutChart= new Chart(this.doughnutChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Bahagia', 'Senang', 'Netral', 'Sedih', 'Buruk'], 
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#3CB403',
              '#B4CC4E',
              '#FFD300',
              '#FFC30B',
              '#D0312D'
            ]
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  onSelectCalendarDateChanged(date: Date) {
    this.calendarPrevNextSubject.next(date);
  }

  onViewMoodsByDate(date: Date) {
    this.calendarDateClicked= true;
    this.getMoodsByDate= this.store
      .select(getMoodsByDate(transformDateTime(date).toISODate()))
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (this.calendarDateClicked && res.moods.length) {
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

      this.calendarDateClicked= false;
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
