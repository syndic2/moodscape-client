import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { showAlert } from '../actions/application.actions';
import {
  fetchMoods,
  fetchMood,
  fetchSearchMood,
  fetchCreateMood,
  fetchUpdateMood,
  removeMoodsConfirmation,
  fetchRemoveMoods,

  setMoods,
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

  getMood$= createEffect(() => this.actions$.pipe(
    ofType(fetchMood),
    exhaustMap(({ moodId }) => this.moodService.getMood(moodId).pipe(
      map(res => setMood({ mood: res.mood }))
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
      map(res => createMood({ mood: res.createdMood }))
    ))
  ));

  updateMood$= createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateMood),
    concatMap(({ moodId, fields }) => this.moodService.updateMood(moodId, fields).pipe(
      switchMap(res => [
        updateMood({ moodId: res.updatedMood.Id, fields: res.updatedMood }),
        showAlert({
          options: {
            message: 'Berhasil menyimpan perubahan',
            buttons: ['OK']
          }
        })
      ])
    ))
  ));

  removeMoodsConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeMoodsConfirmation),
    map(({ moodIds }) => showAlert({
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
              this.store.dispatch(fetchRemoveMoods({ moodIds: moodIds }));
            }
          }
        ]
      }
    }))
  ));

  removeMoods$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveMoods),
    mergeMap(({ moodIds }) => this.moodService.removeMoods(moodIds).pipe(
      map(res => removeMoods({ moodIds: res.removedMoods }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private moodService: MoodService) {}
};
