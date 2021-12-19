import { createAction, props } from '@ngrx/store';

import { NavigationExtras } from '@angular/router';

export const navigateGo = createAction(
  '[Router] Navigate to',
  props<{ path: any[], query?: {}, extras?: NavigationExtras }>()
);

export const navigateBack = createAction('[Router] Navigate back');
