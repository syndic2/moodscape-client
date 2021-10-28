import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { showAlert, showRequestErrorModal } from '../actions/application.actions';
import {
  fetchMoods,
  fetchMoodsChart,
  fetchMood,
  fetchSearchMood,
  fetchCreateMood,
  fetchUpdateMood,
  removeMoodsConfirmation,
  fetchRemoveMoods,

  setMoods,
  setMoodsChart,
  setMood,
  setMoodSearchResults,
  createMood,
  updateMood,
  removeMoods
} from '../actions/mood.actions';
import { MoodService } from 'src/app/services/mood/moods.service';

@Injectable()
export class MoodEffects {
  getMoods$= createEffect(() => this.actions$.pipe(
    ofType(fetchMoods),
    exhaustMap(() => this.moodService.getMoods().pipe(
      map(res => setMoods({ moods: res.moods }))
    ))
  ));
  
  getMoodsChart$= createEffect(() => this.actions$.pipe(
    ofType(fetchMoodsChart),
    exhaustMap(() => this.moodService.getMoodsChart().pipe(
      map(res => setMoodsChart({ moodsChart: res.moodsChart }))
    ))
  ));

  getMood$= createEffect(() => this.actions$.pipe(
    ofType(fetchMood),
    exhaustMap(({ moodId }) => this.moodService.getMood(moodId).pipe(
      map(res => !res.mood ? setMood({ mood: res.mood }) : showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba lagi' }))
    ))
  ));

  searchMoods$= createEffect(() => this.actions$.pipe(
    ofType(fetchSearchMood),
    exhaustMap(({ filters }) => this.moodService.searchMood(filters).pipe(
      map(res => setMoodSearchResults({ moods: res.moods }))
    ))
  ));

  createMood$= createEffect(() => this.actions$.pipe(
    ofType(fetchCreateMood),
    concatMap(({ fields }) => this.moodService.createMood(fields).pipe(
      map(res => !res.createdMood ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba lagi' }) : createMood({ mood: res.createdMood }))
    ))
  ));

  updateMood$= createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateMood),
    concatMap(({ moodId, fields }) => this.moodService.updateMood(moodId, fields).pipe(
      switchMap(res => {
        if (!res.updatedMood) {
          return [showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba lagi' })]
        }

        return [
          updateMood({ moodId: res.updatedMood.Id, fields: res.updatedMood }),
          showAlert({
            options: {
              message: 'Berhasil menyimpan perubahan',
              buttons: ['OK']
            }
          })
        ]
      })
    ))
  ));

  removeMoodsConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeMoodsConfirmation),
    map(({ moodIds, removeFromSearchResults }) => showAlert({
      options: {
        message: 'Apakah anda yakin ingin menghapus data mood ini?',
        buttons: [
          {
            text: 'Tetap simpan',
            role: 'cancel'
          },
          {
            text: 'Hapus',
            handler: () => {
              this.store.dispatch(fetchRemoveMoods({ moodIds: moodIds, removeFromSearchResults: removeFromSearchResults }));
            }
          }
        ]
      }
    }))
  ));

  removeMoods$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveMoods),
    mergeMap(({ moodIds, removeFromSearchResults }) => this.moodService.removeMoods(moodIds).pipe(
      map(res => !res.removedMoods.length ? showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba lagi' }) : removeMoods({ moodIds: res.removedMoods, removeFromSearchResults }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private moodService: MoodService) {}
};
