import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { showAlert } from '../actions/application.actions';
import { 
  fetchHabits,
  fetchHabitSearchResults,
  fetchHabit,
  fetchCreateHabit,
  fetchUpdateHabit,
  removeHabitsConfirmation,
  fetchRemoveHabits,
  fetchMarkHabitGoal,
  
  setHabits,
  setHabitSearchResults,
  setHabit,
  createHabit,
  updateHabit,
  removeHabits,
  markHabitGoal
} from '../actions/habit.actions';
import { HabitService } from 'src/app/services/habit/habit.service';

@Injectable()
export class HabitEffects {
  getHabits$= createEffect(() => this.actions$.pipe(
    ofType(fetchHabits),
    exhaustMap(({ day }) => this.habitService.getHabits(day).pipe(
      map(res => setHabits({ habits: res.habits }))
    ))
  ));
  
  getHabit$= createEffect(() => this.actions$.pipe(
    ofType(fetchHabit),
    exhaustMap(({ habitId }) => this.habitService.getHabit(habitId).pipe(
      map(res => setHabit({ habit: res.habit }))
    ))
  ));
  
  createHabit$= createEffect(() => this.actions$.pipe(
    ofType(fetchCreateHabit),
    concatMap(({ fields }) => this.habitService.createHabit(fields).pipe(
      map(res => createHabit({ habit: res.createdHabit }))
    ))
  ));

  updateHabit$= createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateHabit),
    concatMap(({ habitId, fields }) => this.habitService.updateHabit(habitId, fields).pipe(
      switchMap(res => [
        updateHabit({ habitId: res.updatedHabit.Id, fields: res.updatedHabit }),
        showAlert({
          options: {
            message: 'Berhasil menyimpan perubahan!',
            buttons: ['OK']
          }
        })
      ])
    ))
  ));

  removeHabitsConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeHabitsConfirmation),
    map(({ habitIds }) => showAlert({
      options: {
        message: 'Apakah anda yakin ingin menghapus Habit ini?',
        buttons: [
          {
            text: 'Tetap Simpan',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: () => {
              this.store.dispatch(fetchRemoveHabits({ habitIds: habitIds }));
            }
          }
        ]
      }
    }))
  ));

  removeHabits$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveHabits),
    mergeMap(({ habitIds }) => this.habitService.removeHabits(habitIds).pipe(
      map(res => removeHabits({ habitIds: res.removedHabits }))
    ))
  ));
  
  markHabitGoal$= createEffect(() => this.actions$.pipe(
    ofType(fetchMarkHabitGoal),
    concatMap(({ habitId, markedAt }) => this.habitService.markHabitGoal(habitId, markedAt).pipe(
      map(res => markHabitGoal({ habitId: res?.markedHabit?.Id, trackDetails: res?.markedHabit?.trackDetails }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private habitService: HabitService) {}
};