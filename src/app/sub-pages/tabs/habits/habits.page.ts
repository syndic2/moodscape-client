import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Habit } from 'src/app/models/habit.model';
import { fetchHabits } from 'src/app/store/actions/habit.actions';
import { getHabits } from 'src/app/store/selectors/habit.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsPage implements OnInit {
  @ViewChild('slidingList', { static: false }) slidingList: IonList;

  public habits: Habit[] = [];
  public selectedDay: BehaviorSubject<string> = new BehaviorSubject<string>('all day');
  public selectedMode: string = 'all';
  private subscriptions: Subscription;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subscriptions = new Subscription();

    const habitsSubscription = this.store
      .select(getHabits())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
        if (!res.length) {
          this.store.dispatch(fetchHabits());
        }
      });
    this.subscriptions.add(habitsSubscription);

    const getQueryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.selectedMode = !params['mode'] ? 'all' : params['mode'];
      const habitsDaySubscription = this.store
        .select(getHabits(this.selectedDay.value, this.selectedMode))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
          this.habits = res;
        });
      this.subscriptions.add(habitsDaySubscription);
    });
    this.subscriptions.add(getQueryParamsSubscription);
  }

  ionViewWillLeave() {
    this.subscriptions.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchHabits());
    event.target.complete();
  }
}
