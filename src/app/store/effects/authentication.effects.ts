import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap } from 'rxjs/operators';

import { navigateGo } from '../actions/router.actions';
import { fetchLogin, fetchLogout, login, logout } from '../actions/authentication.actions';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class AuthenticationEffects {
  logout$= createEffect(() => this.actions$.pipe(
    ofType(fetchLogout),
    concatMap(() => this.authenticationService.logout().pipe(
      switchMap(() => [
        logout(),
        navigateGo({ path: ['/'], extras: { replaceUrl: true } })
      ])
    ))
  ));
  
  constructor(private actions$: Actions, private authenticationService: AuthenticationService) {}
}
