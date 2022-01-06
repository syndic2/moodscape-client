import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { IonSearchbar } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { MoodEmoticon, MoodFilter } from 'src/app/models/mood.model';
import { Activity } from 'src/app/models/activity.model';
import { fetchSearchMood } from 'src/app/store/actions/mood.actions';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { transformDateTime } from 'src/app/utilities/helpers';

@Component({
  selector: 'app-search-mood',
  templateUrl: './search-mood.page.html',
  styleUrls: ['./search-mood.page.scss'],
})
export class SearchMoodPage implements OnInit {
  @ViewChild('searchBar', { static: true }) searchBar: IonSearchbar;

  public filters: MoodFilter = {
    searchText: '',
    emoticon: null,
    parameters: { internal: false, external: false },
    activities: [],
    note: false,
    createdDate: { start: '', end: '' }
  };

  constructor(private store: Store) { }

  ngOnInit() { }

  onClearFilter(filter: string) {
    if (filter === 'emoticon') this.filters.emoticon = null;
    else if (filter === 'createdDate.start') this.filters.createdDate = { ...this.filters.createdDate, start: '' };
    else if (filter === 'createdDate.end') this.filters.createdDate = { ...this.filters.createdDate, end: '' };
  }

  onSearchChanged(event) {
    this.filters.searchText = event.target.value;
  }

  onSelectRangeDate(date: Date | string, dateRange: string) {
    if (dateRange === 'start') {
      this.filters.createdDate = { ...this.filters.createdDate, start: date as string };
      this.filters.createdDate = { ...this.filters.createdDate, start: this.filters.createdDate.start !== '' ? transformDateTime(date as Date).toISODate() : '' };
    } else if (dateRange === 'end') {
      this.filters.createdDate = { ...this.filters.createdDate, end: date as string };
      this.filters.createdDate = { ...this.filters.createdDate, end: this.filters.createdDate.end !== '' ? transformDateTime(date as Date).toISODate() : '' };
    }
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.filters.emoticon = emoticon;
  }

  onText(filter: string) {
    if (filter === 'internal') this.filters.parameters = { ...this.filters.parameters, internal: !this.filters.parameters.internal };
    else if (filter === 'external') this.filters.parameters = { ...this.filters.parameters, external: !this.filters.parameters.external };
    else if (filter === 'note') this.filters.note = !this.filters.note;
  }

  onSelectActivities(activities: Activity[]) {
    this.filters.activities = activities;
  }

  onSearch() {
    const extrasData: NavigationExtras = { state: { ...this.filters } };

    this.store.dispatch(fetchSearchMood({ filters: { ...this.filters } }));
    this.store.dispatch(navigateGo({ path: ['/moods/search-results'], extras: extrasData }));
  }
}
