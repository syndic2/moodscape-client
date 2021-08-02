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
  private selectedDay;
  
  constructor(private store: Store, private alertController: AlertController) { }

  ngOnInit() {
  }

  onSelectDay(day) {
    this.selectedDay= day;
  }

  async onRemove(habit: Habit) {
    const alert= await this.alertController.create({
      message: 'Apakah anda yakin ingin menghapus Habit ini?',
      buttons: [
        {
          text: 'Hapus',
          handler: () => {
            this.store.dispatch(removeHabits({ habitIds: [habit.Id] }));
          }
        },
        {
          text: 'Tetap Simpan',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
