import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { AnimationController } from '@ionic/angular';

import { Habit } from 'src/app/models/habit.model';
import { poppingAnimation } from 'src/app/animations/utilities.animation';

@Component({
  selector: 'habit-list-item',
  templateUrl: './habit-list-item.component.html',
  styleUrls: ['./habit-list-item.component.scss'],
})
export class HabitListItemComponent implements OnInit {
  @Input() habit: Habit;
  @ViewChild('habitItem', { static: true }) habitItem: ElementRef;
  @ViewChild('habitGoalProgressBar', { static: true }) habitProgressBar: ElementRef;

  public currentGoal: number= 0;
  public goalProgress: number= 0;

  constructor(private animationController: AnimationController) { }

  ngOnInit() {
    this.calculateProgress();
  }

  calculateProgress() {
    this.goalProgress= Math.round((this.currentGoal/this.habit.goal)*100);
  }

  onMarkGoal() {
    poppingAnimation('habit-item', this.habitItem).play();

    if (this.currentGoal < this.habit.goal) {
      this.currentGoal++;
      this.calculateProgress();
    }
  }
}
