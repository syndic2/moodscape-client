import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js/auto';

import { transformDateTime } from 'src/app/utilities/helpers';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchHabits } from 'src/app/store/actions/habit.actions';
import { getHabits, getHabitsByMonth, getHabitsByDate } from 'src/app/store/selectors/habit.selectors';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'habit-statistics',
  templateUrl: './habit-statistics.component.html',
  styleUrls: ['./habit-statistics.component.scss'],
})
export class HabitStatisticsComponent implements OnInit, OnDestroy {
  public habitsByMonth: any[]= [];
  private barChart;
  private calendarDateClicked: boolean= false;
  private calendarPrevNextSubject: BehaviorSubject<Date>= new BehaviorSubject(new Date());

  private calendarPrevNextSubscription: Subscription;
  private getHabitsSubscription: Subscription;
  private getHabitsByMonthSubscription: Subscription;
  private getHabitsByDateSubscription: Subscription;

  constructor(private store: Store, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getHabitsByDateSubscription= this.store
      .select(getHabits())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchHabits());
      }
    });

    this.calendarPrevNextSubscription= this.calendarPrevNextSubject.subscribe(value => {
      this.store.select(getHabitsByMonth(value.getMonth(), value.getFullYear())).subscribe(res => {
        this.habitsByMonth= [...res].map((habit, index) => ({
          title: habit.name,
          startTime: new Date(habit.goalDates.start),
          endTime: new Date(habit.goalDates.start),
          allDay: false
        }));
      });
    });
  }

  ngOnDestroy() {
    this.calendarPrevNextSubscription && this.calendarPrevNextSubscription.unsubscribe();
    this.getHabitsSubscription && this.getHabitsSubscription.unsubscribe();
    this.getHabitsByMonthSubscription && this.getHabitsByMonthSubscription.unsubscribe();
    this.getHabitsByDateSubscription && this.getHabitsByDateSubscription.unsubscribe();
  }

  onSelectCalendarDateChanged(date: Date) {
    this.calendarPrevNextSubject.next(date);
  }

  onViewHabitsByDate(date: Date) {
    this.calendarDateClicked= true;
    this.getHabitsByDateSubscription= this.store.select(getHabitsByDate(transformDateTime(date).toISODate())).subscribe(res => {
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

      this.calendarDateClicked= false;
    });
  }
}
