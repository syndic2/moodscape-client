import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, exhaustMap, concatMap } from 'rxjs/operators';

import { setIsResetForm, showAlert, showRequestErrorModal } from '../actions/application.actions';
import {
  fetchProfile,
  validateCreateUser,
  fetchCreateUser,
  validateUpdateProfile,
  fetchUpdateProfile,
  validateChangePassword,
  fetchChangePassword,
} from '../actions/user.actions';
import { setAuth, updateAuth } from '../actions/authentication.actions';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class UserEffects {
  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(fetchProfile),
    exhaustMap(() => this.userService.getProfile().pipe(
      map(res => setAuth({ user: res.user }))
    ))
  ));

  validateCreateUser$ = createEffect(() => this.actions$.pipe(
    ofType(validateCreateUser),
    switchMap(({ fields, isInvalid }) => {
      if (isInvalid) {
        return [
          showAlert({
            options: {
              message: 'Informasi pengguna ada yang kosong atau tidak valid!',
              buttons: ['OK']
            }
          })
        ]
      }

      return [
        setIsResetForm({ isReset: false }),
        fetchCreateUser({ fields: fields })
      ];
    })
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCreateUser),
    concatMap(({ fields }) => this.userService.createUser(fields).pipe(
      switchMap(res => {
        if (!res.response.status) {
          return [
            showAlert({
              options: {
                message: res.response.text,
                buttons: ['OK']
              }
            })
          ];
        }

        return [
          setIsResetForm({ isReset: true }),
          showAlert({
            options: {
              message: res.response.text,
              buttons: ['OK']
            }
          })
        ];
      })
    ))
  ));

  validateUpdateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(validateUpdateProfile),
    map(({ fields, isInvalid }) => {
      if (isInvalid) {
        return showAlert({
          options: {
            message: 'Informasi pengguna ada yang kosong atau tidak valid!',
            buttons: ['OK']
          }
        })
      }

      return fetchUpdateProfile({ fields: fields });
    })
  ));

  updateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateProfile),
    concatMap(({ fields }) => this.userService.updateProfile(fields).pipe(
      switchMap(res => {
        if (!res.updatedProfile) {
          return [
            showRequestErrorModal({ message: 'Terjadi kesalahan pada server, silahkan coba lagi' })
          ]
        }

        return [
          updateAuth({ fields: res.updatedProfile }),
          showAlert({
            options: {
              message: res.response.text,
              buttons: ['OK']
            }
          })
        ];
      })
    ))
  ));

  validateChangePassword$ = createEffect(() => this.actions$.pipe(
    ofType(validateChangePassword),
    switchMap(({ oldPassword, newPassword, isInvalid }) => {
      if (isInvalid) {
        return [
          showAlert({
            options: {
              message: 'Kolom input ada yang kosong atau inputan tidak valid!',
              buttons: ['OK']
            }
          })
        ]
      }

      return [
        setIsResetForm({ isReset: false }),
        fetchChangePassword({ oldPassword: oldPassword, newPassword: newPassword })
      ];
    })
  ));

  changePassword = createEffect(() => this.actions$.pipe(
    ofType(fetchChangePassword),
    concatMap(({ oldPassword, newPassword }) => this.userService.changePassword(oldPassword, newPassword).pipe(
      switchMap(res => {
        if (!res.response.status) {
          return [
            showAlert({
              options: {
                message: res.response.text,
                buttons: ['OK']
              }
            })
          ];
        }

        return [
          setIsResetForm({ isReset: true }),
          showAlert({
            options: {
              message: res.response.text,
              buttons: ['OK']
            }
          })
        ];
      })
    ))
  ));

  constructor(private actions$: Actions, private userService: UserService) { }
}
