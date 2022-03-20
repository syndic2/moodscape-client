import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { transformDateTime } from 'src/app/utilities/helpers';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchHabits, fetchHabitsChart } from 'src/app/store/actions/habit.actions';
import {
  getHabits,
  getHabitsChartByYear,
  getHabitsByMonth,
  getHabitsByDate,
  getHabitsByBestStreaks,
  getHabitsByTotalCompleted
} from 'src/app/store/selectors/habit.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
// import { SelectCalendarYearPage } from 'src/app/modals/select-calendar-year/select-calendar-year.page';

@Component({
  selector: 'habit-statistics',
  templateUrl: './habit-statistics.component.html',
  styleUrls: ['./habit-statistics.component.scss'],
})
export class HabitStatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas: ElementRef;
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas: ElementRef;

  public habitsByMonth: any[] = [];
  public habitsByBestStreaks: any[] = [];
  public barChart: any;
  public pieChart: any;
  private calendarDateClicked: boolean = false;
  private calendarPrevNextSubject: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  private selectedYearSubject: BehaviorSubject<number> = new BehaviorSubject(new Date().getFullYear());
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    const getHabitsSubscription = this.store
      .select(getHabits())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (!res.length) {
          this.store.dispatch(fetchHabits());
        }
      });
    this.subscriptions.add(getHabitsSubscription);

    const calendarPrevNextSubscription = this.calendarPrevNextSubject.subscribe(value => {
      const getHabitsByMonthSubscription = this.store
        .select(getHabitsByMonth(value.getMonth(), value.getFullYear()))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
          this.habitsByMonth = [...res].map(habit => ({
            title: habit.name,
            startTime: new Date(habit.goalDates.start),
            endTime: new Date(habit.goalDates.start),
            allDay: false
          }));
        });
      this.subscriptions.add(getHabitsByMonthSubscription);
    });
    this.subscriptions.add(calendarPrevNextSubscription);
  }

  ngAfterViewInit() {
    this.initializeCharts();

    const getHabitsByBestStreaksSubscription = this.store
      .select(getHabitsByBestStreaks())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        this.habitsByBestStreaks = [...res];
      });
    this.subscriptions.add(getHabitsByBestStreaksSubscription);

    const selectedYearSubscription = this.selectedYearSubject.subscribe(year => {
      const getHabitsChartSubscription = this.store
        .select(getHabitsChartByYear(year))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
          if (!res.length) {
            this.store.dispatch(fetchHabitsChart());
            this.barChart.data.labels = [];
            this.barChart.data.datasets[0].data = [];
            this.barChart.update();
          } else {
            this.barChart.data.labels = [];
            this.barChart.data.datasets[0].data = [];

            res.forEach(monthGroup => {
              this.barChart.data.labels.push(monthGroup.group.substring(0, 3));
              this.barChart.data.datasets[0].data.push(monthGroup.habitAverageGroupByYear ? monthGroup.habitAverageGroupByYear.average : 0);
            });

            this.barChart.update();
          }
        });
      this.subscriptions.add(getHabitsChartSubscription);
    });
    this.subscriptions.add(selectedYearSubscription);

    const getHabitsByTotalCompletedSubscription = this.store
      .select(getHabitsByTotalCompleted)
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (res.completes === 0 && res.onProgress === 0 && res.notCompletes === 0) {
          this.pieChart.data.datasets[0].data = [];
          this.pieChart.update();
        } else {
          this.pieChart.data.datasets[0].data = [res.completes, res.onProgress, res.notCompletes];
          this.pieChart.update();
        }
      });
    this.subscriptions.add(getHabitsByTotalCompletedSubscription);

    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get selectedYear() {
    return this.selectedYearSubject.value;
  }

  initializeCharts() {
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            barThickness: 12,
            borderRadius: 2,
            backgroundColor: '#5B21B6',
            data: [],
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
            suggestedMax: 100
          }
        }
      }
    });

    this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Selesai', 'Sedang Berjalan', 'Tidak Selesai'],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#3CB403',
              '#FFC30B',
              '#FF0000'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;

              dataArr.forEach((data: any) => sum += data);

              return Math.floor(value * 100 / sum) + '%';
            },
            color: '#FFF'
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  onSelectCalendarDateChanged(date: Date) {
    this.calendarPrevNextSubject.next(date);
  }

  async onSelectBarChartYear() {
    const { SelectCalendarYearPageModule } = await import('../../../../modals/select-calendar-year/select-calendar-year.module');
    const modal = await this.modalController.create({
      component: SelectCalendarYearPageModule.getComponent(),
      componentProps: {
        selectedYear: this.selectedYear
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.selectedYear) {
      this.selectedYearSubject.next(data.selectedYear);
    }
  }

  onViewHabitsByDate(date: Date) {
    this.calendarDateClicked = true;

    const getHabitsByDateSubscription = this.store
      .select(getHabitsByDate(transformDateTime(date).toISODate()))
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (this.calendarDateClicked && res.length) {
          this.store.dispatch(navigateGo({
            path: ['/habits/list-by-date'],
            extras: {
              state: {
                startDate: date,
                habits: [...res]
              }
            }
          }));
        }

        this.calendarDateClicked = false;
      });
    this.subscriptions.add(getHabitsByDateSubscription);
  }
}
