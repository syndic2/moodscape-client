import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

import { navigateGo } from '../actions/router.actions';
import { showAlert } from '../actions/application.actions';
import { 
  requestLogin, 
  fetchLogin, 
  requestResetPassword,
  fetchResetPassword,
  fetchLogout, 
  
  setAuth, 
  logout 
} from '../actions/authentication.actions';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class AuthenticationEffects {
  requestLogin$= createEffect(() => this.actions$.pipe(
    ofType(requestLogin),
    map(({ credentials, withGoogle, isInvalid }) => {
      if (isInvalid) {
        return showAlert({
          options: {
            message: 'Kolom input ada yang kosong atau inputan tidak valid!',
            buttons: ['OK']
          }
        })
      } else {
        return fetchLogin({ credentials: credentials, withGoogle: withGoogle });
      }
    }),
  ));

  login$= createEffect(() => this.actions$.pipe(
    ofType(fetchLogin),
    exhaustMap(({ credentials, withGoogle }) => this.authenticationService.login(credentials, withGoogle).pipe(
      map(res => {
        if (!res[0].response.status) {
          return showAlert({
            options: {
              message: res[0].response.text,
              buttons: ['OK']
            }
          })
        }

        return { ...res[0], isAuthenticated: true };
      }),
      switchMap(res => {
        if (res.isAuthenticated) {
          return [
            setAuth({ user: res.authenticatedUser }),
            navigateGo({ path: ['/side-menu'] })
          ];
        }

        return [res];
      })
    ))
  ));
  
  requestResetPassword$= createEffect(() => this.actions$.pipe(
    ofType(requestResetPassword)
  ));

  resetPassword$= createEffect(() => this.actions$.pipe(
    ofType(fetchResetPassword)
  ));

  logout$= createEffect(() => this.actions$.pipe(
    ofType(fetchLogout),
    exhaustMap(() => this.authenticationService.logout().pipe(
      map(() => navigateGo({ path: ['/'], extras: { state: { onLogout: true }, replaceUrl: true } }))
    ))
  ));
  
  clearStateLogout$= createEffect(() => this.actions$.pipe(
    ofType(navigateGo),
    map(({ extras }) => {
      if (extras?.state?.onLogout) {
        this.store.dispatch(logout());
      }
    })
  ), { dispatch: false });

  constructor(private store: Store, private actions$: Actions, private authenticationService: AuthenticationService) {}
}
