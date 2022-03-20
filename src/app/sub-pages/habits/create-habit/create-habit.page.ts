import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fetchCreateHabit, fetchHabitsChart } from 'src/app/store/actions/habit.actions';
import { navigateGo } from 'src/app/store/actions/router.actions';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.page.html',
  styleUrls: ['./create-habit.page.scss'],
})
export class CreateHabitPage implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit(fields: {}) {
    this.store.dispatch(fetchCreateHabit({ fields: fields }));
    this.store.dispatch(fetchHabitsChart());
    this.store.dispatch(navigateGo({ path: ['/side-menu/tabs/habits'] }));
  }
}
