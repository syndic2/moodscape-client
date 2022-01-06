import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { HabitFilter } from 'src/app/models/habit.model';
import { fetchSearchHabit } from 'src/app/store/actions/habit.actions';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { transformDateTime } from 'src/app/utilities/helpers';

@Component({
  selector: 'app-search-habit',
  templateUrl: './search-habit.page.html',
  styleUrls: ['./search-habit.page.scss'],
})
export class SearchHabitPage implements OnInit {
  @ViewChild('searchBar', { static: true }) searchBar: IonSearchbar;

  public filters: HabitFilter = {
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    reminderTime: '',
    labelColor: ''
  };

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onOpenPopOver() {

  }

  onClearFilter(filterProp: string) {
    this.filters[filterProp] = '';
  }

  onSearchChanged(event) {
    this.filters.name = event.target.value;
  }

  onSelectType(type: string) {
    this.filters.type = type;
  }

  onSelectRangeDate(date: Date | string, dateRangeProp: string) {
    this.filters[dateRangeProp] = date !== '' ? transformDateTime(date as Date).toISODate() : '';
  }

  onSelectReminderTime(time: string) {
    this.filters.reminderTime = time;
  }

  onSelectLabelColor(color: string) {
    this.filters.labelColor = color;
  }

  onSearch() {
    const extrasData: NavigationExtras = { state: { ...this.filters } };

    this.store.dispatch(fetchSearchHabit({
      filters: {
        ...this.filters,
        labelColor: this.filters.labelColor.replace('#', '')
      }
    }));
    this.store.dispatch(navigateGo({ path: ['/habits/search-results'], extras: extrasData }));
  }
}
