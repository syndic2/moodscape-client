import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Habit } from 'src/app/models/habit.model';
import { fetchHabits, removeHabitsConfirmation } from 'src/app/store/actions/habit.actions';
import { getHabits } from 'src/app/store/selectors/habit.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsPage implements OnInit {
  public habits: Habit[]= [];
  private habitsSubscription: Subscription;
  private habitsDaySubscription: Subscription;
  public selectedDay: BehaviorSubject<string>= new BehaviorSubject<string>('all day');
  private selectedDaySubscription: Subscription;
  
  constructor(
    private store: Store, 
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.habitsSubscription= this.store
      .select(getHabits())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchHabits({}));
      }
    });
    this.selectedDaySubscription= this.selectedDay.subscribe(day => {
      this.habitsDaySubscription= this.store
        .select(getHabits(day))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
        if (res.length) {
          this.habits= res;
        }
      });
    });
  }

  ionViewWillLeave() {
    this.habitsSubscription && this.habitsSubscription.unsubscribe();
    this.habitsDaySubscription && this.habitsDaySubscription.unsubscribe();
    this.selectedDaySubscription && this.selectedDaySubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchHabits({}));
    event.target.complete();
  }

  onSelectDay(day) {
    this.selectedDay.next(day.name); 
  }

  onRemove(habit: Habit) {
    this.store.dispatch(removeHabitsConfirmation({ habitIds: [habit.Id] }));
  }
}
