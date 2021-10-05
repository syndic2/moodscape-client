import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';

import { Habit } from 'src/app/models/habit.model';
import { daysBetweenDates, transformDateTime } from 'src/app/utilities/helpers';
import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { fetchMarkHabitGoal } from 'src/app/store/actions/habit.actions';

@Component({
  selector: 'habit-list-item',
  templateUrl: './habit-list-item.component.html',
  styleUrls: ['./habit-list-item.component.scss'],
})
export class HabitListItemComponent implements OnInit {
  @Input() habit: Habit;
  @ViewChild('habitItem', { static: true }) habitItem: ElementRef;
  @ViewChild('habitGoalProgressBar', { static: true }) habitProgressBar: ElementRef;
  
  public daysLeft: number= 0;
  public goalProgress: number= 0;
  private currentGoal: number= 0;
  private targetGoal: number= 0;
  private currentDate: Date= new Date();

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentGoal= this.habit.trackDetails?.currentGoal;
    this.targetGoal= this.habit.goal;
    this.calculateProgress();
    
    const startDate= new Date(this.habit.goalDates.start);
    const endDate= new Date(this.habit.goalDates.end);
    if (this.currentDate >= startDate && this.currentDate <= endDate) {
      this.daysLeft= daysBetweenDates(transformDateTime(this.currentDate).toISODate(), transformDateTime(endDate).toISODate());
    } else {
      this.daysLeft= -1;
    }
  }

  calculateProgress() {
    if (this.currentGoal < this.targetGoal) {
      this.goalProgress= Math.round((this.currentGoal/this.targetGoal)*100);
    }
  }

  onMarkGoal() {
    poppingAnimation('habit-item', this.habitItem).play();

    if (this.daysLeft !== 0) {
      if (this.habit.trackDetails === null) {
        this.currentGoal++;
        this.store.dispatch(fetchMarkHabitGoal({ habitId: this.habit.Id, markedAt: transformDateTime(this.currentDate).toISODate() }));
      } else {
        if (this.habit.trackDetails?.lastMarkedAt !== transformDateTime(this.currentDate).toISODate() && this.habit.trackDetails?.currentGoal < this.habit.goal) {
          this.currentGoal++;
          this.store.dispatch(fetchMarkHabitGoal({ habitId: this.habit.Id, markedAt: transformDateTime(this.currentDate).toISODate() }));
        }
      }

      this.calculateProgress();
    }
  }
}
