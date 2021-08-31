import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public onBackdrop: BehaviorSubject<boolean>= new BehaviorSubject(false);
  public onSkeletonLoading: BehaviorSubject<boolean>= new BehaviorSubject(true);

  constructor() { }

  isSkeletonLoading() {
    return this.onSkeletonLoading.value;
  }

  resetSkeletonLoading() {
    this.onSkeletonLoading.next(true);
    setTimeout(() => this.onSkeletonLoading.next(false), 800);
  }
}
