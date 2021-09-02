import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
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
<<<<<<< HEAD
  private habitsDaySubscription: Subscription;
=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
  public selectedDay: BehaviorSubject<string>= new BehaviorSubject<string>('all day');
  private selectedDaySubscription: Subscription;
  
  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
<<<<<<< HEAD
    this.habitsSubscription= this.store.select(getHabits()).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchHabits({}));
      }
    });
    this.selectedDaySubscription= this.selectedDay.subscribe(day => {
      this.habitsDaySubscription= this.store.select(getHabits(day)).subscribe(res => {
        if (res.length) {
          this.habits= res;
        }
=======
    this.store.dispatch(fetchHabits({}));
    this.selectedDaySubscription= this.selectedDay.subscribe(day => {
      this.habitsSubscription= this.store.select(getHabits(day)).subscribe(res => {
        this.habits= res;
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
      });
    });
  }

<<<<<<< HEAD
  ionViewWillLeave() {
    this.habitsSubscription && this.habitsSubscription.unsubscribe();
    this.habitsDaySubscription && this.habitsDaySubscription.unsubscribe();
    this.selectedDaySubscription && this.selectedDaySubscription.unsubscribe();
  }

=======
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
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
