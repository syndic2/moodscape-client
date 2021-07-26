import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public onBackdrop: BehaviorSubject<boolean>= new BehaviorSubject(false);

  constructor() { }
}
