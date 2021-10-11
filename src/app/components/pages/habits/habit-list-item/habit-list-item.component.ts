import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';

import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { daysBetweenDates, transformDateTime } from 'src/app/utilities/helpers';
import { Habit, HabitStreakLog } from 'src/app/models/habit.model';
import { showAlert } from 'src/app/store/actions/application.actions';
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
  
  public currentLog: HabitStreakLog;
  public daysLeft: number= 0;
  public currentGoal: number= 0;
  public goalProgress: number= 0;
  private currentDate: Date= new Date();

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentLog= this.habit.track.streakLogs.find(log => log.startDate === this.habit.goalDates.start);
    this.currentGoal= this.currentLog.currentGoal;
    this.calculateProgress();
    
    const startDate= new Date(this.habit.goalDates.start);
    const endDate= new Date(this.habit.goalDates.end);
    
    this.currentDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (this.currentDate >= startDate && this.currentDate <= endDate) {
      this.daysLeft= daysBetweenDates(transformDateTime(this.currentDate).toISODate(), transformDateTime(endDate).toISODate());
      this.daysLeft= this.goalProgress === 100 ? 0 : this.daysLeft;
    } else {
      this.daysLeft= -1;
    }
  }

  calculateProgress() {
    if (this.currentGoal <= this.currentLog.targetGoal) {
      this.goalProgress= Math.round((this.currentGoal/this.currentLog.targetGoal)*100);
    }
  }

  onMarkGoal() {
    const startDate= new Date(this.habit.goalDates.start);
    const endDate= new Date(this.habit.goalDates.end);
    
    this.currentDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    poppingAnimation('habit-item', this.habitItem).play();

    if (this.currentGoal === this.habit.goal) {
      return this.store.dispatch(
        showAlert({ 
          options: {
            message: 'Habit sudah selesai ditandai semua',
            buttons: ['OK']
          }   
        }
      ));
    }
    
    if (this.daysLeft === 0) {
      return this.store.dispatch(
        showAlert({ 
          options: {
            message: 'Waktu habit sudah selesai',
            buttons: ['OK']
          }   
        }
      ));
    } else if (this.daysLeft === -1) {
      return this.store.dispatch(
        showAlert({ 
          options: {
            message: 'Waktu habit belum dimulai',
            buttons: ['OK']
          }   
        }
      ));
    }

    if (this.currentLog.lastMarkedAt === transformDateTime(this.currentDate).toISODate()) {
      return this.store.dispatch(
        showAlert({ 
          options: {
            message: 'Habit sudah ditandai untuk hari ini',
            buttons: ['OK']
          }   
        }
      ));
    }

    this.currentGoal++;
    this.calculateProgress();
    this.store.dispatch(fetchMarkHabitGoal({ habitId: this.habit.Id, markedAt: transformDateTime(this.currentDate).toISODate() }));
  }
}
