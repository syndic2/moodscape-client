import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Habit, HabitStreakLog } from 'src/app/models/habit.model';

@Component({
  selector: 'app-habit-tracks-history',
  templateUrl: './habit-tracks-history.page.html',
  styleUrls: ['./habit-tracks-history.page.scss'],
})
export class HabitTracksHistoryPage implements OnInit {
  public habit: Habit;
  public tracksHistory: HabitStreakLog[]= [];

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.habit= this.router.getCurrentNavigation().extras.state.habit;
      this.tracksHistory= this.router.getCurrentNavigation().extras.state.tracksHistory;

      console.log('track history', this.tracksHistory);
    }
  }
}
