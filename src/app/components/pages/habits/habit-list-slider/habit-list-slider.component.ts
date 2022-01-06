import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IonList } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { Habit } from 'src/app/models/habit.model';
import { removeHabitsConfirmation } from 'src/app/store/actions/habit.actions';
import { navigateGo } from 'src/app/store/actions/router.actions';

@Component({
  selector: 'habit-list-slider',
  templateUrl: './habit-list-slider.component.html',
  styleUrls: ['./habit-list-slider.component.scss'],
})
export class HabitListSliderComponent implements OnInit {
  @Input() habits: Habit[] = [];
  @ViewChild('slidingList', { static: false }) slidingList: IonList;

  constructor(private store: Store) { }

  ngOnInit() { }

  onEdit(habit: Habit) {
    this.store.dispatch(navigateGo({ path: ['/habits', habit.Id] }));
    this.slidingList.closeSlidingItems();
  }

  onRemove(habit: Habit) {
    this.store.dispatch(removeHabitsConfirmation({ habitIds: [habit.Id] }));
  }
}
