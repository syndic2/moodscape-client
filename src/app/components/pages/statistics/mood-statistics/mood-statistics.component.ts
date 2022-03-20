import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store, ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Chart from 'chart.js/auto';

import { monthNames, transformDateTime } from 'src/app/utilities/helpers';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchMoods, fetchMoodsChart } from 'src/app/store/actions/mood.actions';
import { getMoods, getMoodsByMonth, getMoodsByDate, getMoodsChartByMonthYear, getMoodsTotalCount } from 'src/app/store/selectors/mood.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'mood-statistics',
  templateUrl: './mood-statistics.component.html',
  styleUrls: ['./mood-statistics.component.scss'],
})
export class MoodStatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas: ElementRef;
  @ViewChild('doughnutChartCanvas', { static: false }) doughnutChartCanvas: ElementRef;

  public monthNames: (month: number) => string = monthNames;
  public moodsByMonth = { moods: [], moodsCount: null };
  public lineChart: any;
  public doughnutChart: any;
  private calendarDateClicked: boolean = false;
  private calendarPrevNextSubject: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  private selectedMonthYearSubject: BehaviorSubject<{ month: number, year: number }> = new BehaviorSubject({ month: new Date().getMonth(), year: new Date().getFullYear() });
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private actionSubject: ActionsSubject,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    const getMoodsSubscription = this.store
      .select(getMoods)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (!res.length) {
          this.store.dispatch(fetchMoods());
        }
      });
    this.subscriptions.add(getMoodsSubscription);

    const calendarPrevNextSubscription = this.calendarPrevNextSubject.subscribe(value => {
      const getMoodsByMonthSubscription = this.store
        .select(getMoodsByMonth(value.getMonth(), value.getFullYear()))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
          this.moodsByMonth.moods = [...res.moods].map(mood => ({
            title: mood.createdAt.date,
            startTime: new Date(mood.createdAt.date),
            endTime: new Date(mood.createdAt.date),
            allDay: false
          }));
          this.moodsByMonth.moodsCount = { ...res.moodsCount };
        });
      this.subscriptions.add(getMoodsByMonthSubscription);
    });
    this.subscriptions.add(calendarPrevNextSubscription);
  }

  ngAfterViewInit() {
    this.initializeCharts();

    const selectedMonthYearSubscription = this.selectedMonthYearSubject.subscribe(res => {
      const getMoodsChartSubscription = this.store
        .select(getMoodsChartByMonthYear(res.month, res.year))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
          if (!res) {
            this.store.dispatch(fetchMoodsChart());
            this.lineChart.data.labels = [];
            this.lineChart.data.datasets[0].data = [];
            this.lineChart.update();
          } else {
            this.lineChart.data.labels = [];
            this.lineChart.data.datasets[0].data = [];

            res.moodAverageByRangeDate.forEach(mood => {
              this.lineChart.data.labels.push(mood.startDate);
              this.lineChart.data.datasets[0].data.push(mood.average);
            });

            this.lineChart.update();
          }
        });
      this.subscriptions.add(getMoodsChartSubscription);
    });
    this.subscriptions.add(selectedMonthYearSubscription);

    const getMoodsTotalCountSubscription = this.store
      .select(getMoodsTotalCount)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (res.gembira === 0 && res.senang === 0 && res.netral === 0 && res.sedih === 0 && res.buruk === 0) {
          this.doughnutChart.data.datasets[0].data = [];
          this.doughnutChart.update();
        } else {
          this.doughnutChart.data.datasets[0].data = [];

          Object.entries(res).forEach(([key, value]) => {
            this.doughnutChart.data.datasets[0].data.push(value);
          });

          this.doughnutChart.update();
        }
      });
    this.subscriptions.add(getMoodsTotalCountSubscription);

    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get selectedMonth() {
    return this.selectedMonthYearSubject.value.month;
  }

  get selectedYear() {
    return this.selectedMonthYearSubject.value.year;
  }

  initializeCharts() {
    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
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

    this.doughnutChart = new Chart(this.doughnutChartCanvas.nativeElement, {
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
    this.calendarDateClicked = true;
    const getMoodsByDateSubscription = this.store
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

        this.calendarDateClicked = false;
      });
    this.subscriptions.add(getMoodsByDateSubscription);
  }

  async onSelectLineChartMonth() {
    const { SelectCalendarMonthPageModule } = await import('../../../../modals/select-calendar-month/select-calendar-month.module');
    const modal = await this.modalController.create({
      component: SelectCalendarMonthPageModule.getComponent(),
      componentProps: {
        selectedMonth: this.selectedMonthYearSubject.value.month
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.selectedMonth !== undefined) {
      this.selectedMonthYearSubject.next({ ...this.selectedMonthYearSubject.value, month: data.selectedMonth });
    }
  }

  async onSelectLineChartYear() {
    const { SelectCalendarYearPageModule } = await import('../../../../modals/select-calendar-year/select-calendar-year.module');
    const modal = await this.modalController.create({
      component: SelectCalendarYearPageModule.getComponent(),
      componentProps: {
        selectedYear: this.selectedMonthYearSubject.value.year
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.selectedYear !== undefined) {
      this.selectedMonthYearSubject.next({ ...this.selectedMonthYearSubject.value, year: data.selectedYear });
    }
  }
}
