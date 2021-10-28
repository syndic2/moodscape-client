import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { Habit } from 'src/app/models/habit.model';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { fetchHabits, fetchHabit, fetchUpdateHabit } from 'src/app/store/actions/habit.actions';
import { getHabits, getHabit } from 'src/app/store/selectors/habit.selectors';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.page.html',
  styleUrls: ['./habit-detail.page.scss'],
})
export class HabitDetailPage implements OnInit {
  public transformDateTime= transformDateTime;
  private habitId: number;
  public habit: Habit;
  public habitTracks= { events: [], streaks: [], history: [] };
  private getHabitSubscription: Subscription;
  private getHabitsSubscription: Subscription;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.habitId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.getHabitSubscription= this.store.select(getHabit(this.habitId)).subscribe(res => {
      if (!res) {
        this.store.dispatch(fetchHabit({ habitId: this.habitId }));
      } else {
        this.habit= res;
        this.habitTracks.events= [{
          title: '',
          startTime: new Date(res.goalDates.start),
          endTime: new Date(res.goalDates.end),
          allDay: false
        }];
        this.habitTracks.streaks= [...res.track.streakLogs.find(log => log.startDate === this.habit.goalDates.start).markedAt];
        this.habitTracks.history= [...res.track.streakLogs];
      }
    }); 
  }

  ionViewWillLeave() {
    this.getHabitSubscription && this.getHabitSubscription.unsubscribe();
    this.getHabitsSubscription && this.getHabitsSubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.getHabitsSubscription= this.store.select(getHabits()).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchHabits());
      }
    })
    
    this.store.dispatch(fetchHabit({ habitId: this.habitId }));
    event.target.complete();
  }

  onViewHistory() {
    this.store.dispatch(navigateGo({
      path: ['habits', this.habit.Id, 'tracks-history'],
      extras: {
        state: {
          habit: this.habit,
          tracksHistory: this.habitTracks.history
        }
      }
    }));
  }

  onUpdate(fields: {}) {
    this.store.dispatch(fetchUpdateHabit({ habitId: this.habitId, fields: fields }));
  }
}
