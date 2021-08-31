import { Component, OnInit } from '@angular/core';

import { UntilDestroy } from '@ngneat/until-destroy';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Habit } from 'src/app/models/habit.model';
import { fetchHabits, removeHabitsConfirmation } from 'src/app/store/actions/habit.actions';
import { getHabits } from 'src/app/store/selectors/habit.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsPage implements OnInit {
  public habits: Habit[]= [];
  private habitsSubscription: Subscription;
  public selectedDay: BehaviorSubject<string>= new BehaviorSubject<string>('all day');
  private selectedDaySubscription: Subscription;
  
  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.store.dispatch(fetchHabits({}));
    this.selectedDaySubscription= this.selectedDay.subscribe(day => {
      this.habitsSubscription= this.store.select(getHabits(day)).subscribe(res => {
        this.habits= res;
      });
    });
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
