import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IonList } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Habit } from 'src/app/models/habit.model';
import { fetchHabits, removeHabitsConfirmation } from 'src/app/store/actions/habit.actions';
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

  public habits: Habit[]= [];
  public selectedDay: BehaviorSubject<string>= new BehaviorSubject<string>('all day');
  public selectedMode: string= 'all';

  private getQueryParamsSubscription: Subscription;
  private selectedDaySubscription: Subscription;
  private habitsSubscription: Subscription;
  private habitsDaySubscription: Subscription;
  
  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    public utilitiesService: UtilitiesService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.habitsSubscription= this.store
      .select(getHabits())
      .pipe(takeUntil(this.authenticationService.isLoggedIn))
      .subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchHabits());
      }
    });

    this.getQueryParamsSubscription= this.activatedRoute.queryParams.subscribe(params => {
      if (JSON.stringify(params) !== '{}') {
        this.selectedMode= params['mode'];
          this.habitsDaySubscription= this.store
          .select(getHabits(this.selectedDay.value, this.selectedMode))
          .pipe(takeUntil(this.authenticationService.isLoggedIn))
          .subscribe(res => {
          this.habits= res;
        });
      }
    });

    this.selectedDaySubscription= this.selectedDay.subscribe(day => {
      this.habitsDaySubscription= this.store
        .select(getHabits(day, this.selectedMode))
        .pipe(takeUntil(this.authenticationService.isLoggedIn))
        .subscribe(res => {
        this.habits= res;
      });
    });
  }

  ionViewWillLeave() {
    this.getQueryParamsSubscription && this.getQueryParamsSubscription.unsubscribe();
    this.selectedDaySubscription && this.selectedDaySubscription.unsubscribe();
    this.habitsSubscription && this.habitsSubscription.unsubscribe();
    this.habitsDaySubscription && this.habitsDaySubscription.unsubscribe();
  }

  pullRefresh(event) {
    this.store.dispatch(fetchHabits());
    event.target.complete();
  }

  onSelectDay(day) {
    this.selectedDay.next(day.name); 
  }

  onEdit(habit: Habit) {
    this.router.navigate(['/habits', habit.Id]);
    this.slidingList.closeSlidingItems();
  }

  onRemove(habit: Habit) {
    this.store.dispatch(removeHabitsConfirmation({ habitIds: [habit.Id] }));
  }
}
