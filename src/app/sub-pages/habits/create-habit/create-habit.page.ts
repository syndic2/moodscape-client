import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { fetchCreateHabit } from 'src/app/store/actions/habit.actions';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.page.html',
  styleUrls: ['./create-habit.page.scss'],
})
export class CreateHabitPage implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(fields: {}) {
    this.store.dispatch(fetchCreateHabit({ fields: fields }));
    this.router.navigate(['/side-menu/tabs/habits']);
  }
}
