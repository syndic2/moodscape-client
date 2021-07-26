import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Habit } from 'src/app/models/habit.model';
import { selectHabits } from 'src/app/store/selectors/habits.selectors';
import { removeHabits } from 'src/app/store/actions/habits.actions';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsPage implements OnInit {
  public habits$: Observable<Habit[]>= this.store.select(selectHabits);
  public daySelections= [
    { day: 'all days', label: 'Setiap Hari', selected: true },
    { day: 'monday', label: 'Senin', selected: false },
    { day: 'tuesday', label: 'Selasa', selected: false },
    { day: 'wednesday', label: 'Rabu', selected: false },
    { day: 'thursday', label: 'Kamis', selected: false },
    { day: 'friday', label: 'Jumat', selected: false },
    { day: 'saturday', label: 'Sabtu', selected: false },
    { day: 'sunday', label: 'Minggu', selected: false },
  ];
  public sliderOptions= {
		slidesPerView: 4,
    spaceBetween: 10,
    freeMode: true
	};

  constructor(private store: Store, private alertController: AlertController) { }

  ngOnInit() {
  }

  onSelectDay(selection) {
    this.daySelections.forEach(object => object.selected= false);
    this.daySelections.find(object => object.day === selection.day).selected= true;
  }

  onRemove(habit: Habit) {
    this.store.dispatch(removeHabits({ habitIds: [habit.Id] }));
  }
}
