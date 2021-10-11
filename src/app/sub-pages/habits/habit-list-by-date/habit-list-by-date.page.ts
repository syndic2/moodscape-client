import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Habit } from 'src/app/models/habit.model';

@Component({
  selector: 'app-habit-list-by-date',
  templateUrl: './habit-list-by-date.page.html',
  styleUrls: ['./habit-list-by-date.page.scss'],
})
export class HabitListByDatePage implements OnInit {
  public startDate: Date;
  public habits: Habit[]= [];
  
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.startDate= this.router.getCurrentNavigation().extras.state.startDate;
      this.habits= this.router.getCurrentNavigation().extras.state.habits;
    }
  }

  onRemove(habit: Habit) {
    
  }
}
