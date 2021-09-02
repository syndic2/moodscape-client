import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

<<<<<<< HEAD
=======
import { UntilDestroy } from '@ngneat/until-destroy';

>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Habit } from 'src/app/models/habit.model';
<<<<<<< HEAD
import { fetchHabit, fetchUpdateHabit } from 'src/app/store/actions/habit.actions';
import { getHabit } from 'src/app/store/selectors/habit.selectors';

=======
import { fetchHabit, fetchHabits, fetchUpdateHabit } from 'src/app/store/actions/habit.actions';
import { getHabit } from 'src/app/store/selectors/habit.selectors';

@UntilDestroy({ checkProperties: true })
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.page.html',
  styleUrls: ['./habit-detail.page.scss'],
})
export class HabitDetailPage implements OnInit {
  public habit: Habit;
  private habitSubscription: Subscription;
  private habitId: number;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.habitId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
<<<<<<< HEAD
    this.habitSubscription= this.store.select(getHabit(this.habitId)).subscribe(res => {
      if (res !== null) {
        this.habit= res;
      }
    }); 
  }

  ionViewWillLeave() {
    this.habitSubscription && this.habitSubscription.unsubscribe();
  }

  pullRefresh(event) {
=======
    this.store.dispatch(fetchHabit({ habitId: this.habitId }));
    this.habitSubscription= this.store.select(getHabit(this.habitId)).subscribe(res => {
      this.habit= res;
    }); 
  }

  pullRefresh(event) {
    this.store.dispatch(fetchHabits({}));
>>>>>>> acf069cbc11c51661d5f1d42c038b318fd528795
    this.store.dispatch(fetchHabit({ habitId: this.habitId }));
    event.target.complete();
  }

  onUpdate(fields: {}) {
    this.store.dispatch(fetchUpdateHabit({ habitId: this.habitId, fields: fields }));
  }
}
