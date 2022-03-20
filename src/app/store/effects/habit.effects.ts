import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { showAlert, showRequestErrorModal } from '../actions/application.actions';
import {
  fetchHabits,
  fetchHabitsChart,
  fetchHabit,
  fetchSearchHabit,
  fetchCreateHabit,
  fetchUpdateHabit,
  removeHabitsConfirmation,
  fetchRemoveHabits,
  fetchMarkHabitGoal,

  setHabits,
  setHabitsChart,
  setHabit,
  setHabitSearchResults,
  createHabit,
  updateHabit,
  removeHabits,
  markHabitGoal
} from '../actions/habit.actions';
import { HabitService } from 'src/app/services/habit/habit.service';

@Injectable()
export class HabitEffects {
  getHabits$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHabits),
    exhaustMap(() => this.habitService.getHabits().pipe(
      map(res => setHabits({ habits: res.habits }))
    ))
  ));

  getHabitsChart$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHabitsChart),
    exhaustMap(() => this.habitService.getHabitsChart().pipe(
      map(res => setHabitsChart({ habitsChart: res.habitsChart }))
    ))
  ));

  getHabit$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHabit),
    exhaustMap(({ habitId }) => this.habitService.getHabit(habitId).pipe(
      map(res => !res.habit ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba kembali' }) : setHabit({ habit: res.habit }))
    ))
  ));

  searchHabits$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSearchHabit),
    exhaustMap(({ filters }) => this.habitService.searchHabit(filters).pipe(
      map(res => setHabitSearchResults({ habits: res.habits }))
    ))
  ));

  createHabit$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCreateHabit),
    concatMap(({ fields }) => this.habitService.createHabit(fields).pipe(
      map(res => !res.createdHabit ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba kembali' }) : createHabit({ habit: res.createdHabit }))
    ))
  ));

  updateHabit$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateHabit),
    concatMap(({ habitId, fields }) => this.habitService.updateHabit(habitId, fields).pipe(
      switchMap(res => {
        if (!res.updatedHabit) {
          return [showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba kembali' })]
        }

        return [
          updateHabit({ habitId: res.updatedHabit.Id, fields: res.updatedHabit }),
          showAlert({
            options: {
              message: 'Berhasil menyimpan perubahan!',
              buttons: ['OK']
            }
          })
        ]
      })
    ))
  ));

  removeHabitsConfirmation$ = createEffect(() => this.actions$.pipe(
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

  removeHabits$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveHabits),
    mergeMap(({ habitIds }) => this.habitService.removeHabits(habitIds).pipe(
      map(res => !res.removedHabits.length ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba kembali' }) : removeHabits({ habitIds: res.removedHabits }))
    ))
  ));

  markHabitGoal$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMarkHabitGoal),
    concatMap(({ habitId, markedAt }) => this.habitService.markHabitGoal(habitId, markedAt).pipe(
      map(res => !res.markedHabit ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba kembali' }) : markHabitGoal({ habitId: res.markedHabit.Id, fields: res.markedHabit }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private habitService: HabitService) { }
};
