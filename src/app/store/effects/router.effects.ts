import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { navigateGo, navigateBack } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  navigateGo$= createEffect(() => this.actions$.pipe(
    ofType(navigateGo),
    tap(({ path, query, extras }) => this.router.navigate(path, { ...query, ...extras }))
  ), { dispatch: false });
  
  navigateBack$= createEffect(() => this.actions$.pipe(
    ofType(navigateBack),
    tap(() => this.location.back())
  ), { dispatch: false });

  constructor(private actions$: Actions, private location: Location, private router: Router) {}
};
