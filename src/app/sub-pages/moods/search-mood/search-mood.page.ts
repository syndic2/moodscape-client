import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { IonSearchbar } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { MoodEmoticon, MoodFilter } from 'src/app/models/mood.model';
import { fetchSearchMood } from 'src/app/store/actions/mood.actions';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-search-mood',
  templateUrl: './search-mood.page.html',
  styleUrls: ['./search-mood.page.scss'],
})
export class SearchMoodPage implements OnInit {
  @ViewChild('searchBar', { static: true }) searchBar: IonSearchbar;

  public filters: MoodFilter= {
    searchText: '',
    emoticon: null,
    parameters: { internal: false, external: false },
    activities: [],
    note: false
  };

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {}

  onSearchChanged(event) {
    this.filters.searchText= event.target.value;
  }

  onSelectEmoticon(emoticon: MoodEmoticon) {
    this.filters.emoticon= emoticon;
  }

  onText(filter: string) {
    if (filter === 'internal') this.filters.parameters= { ...this.filters.parameters, internal: !this.filters.parameters.internal };
    else if (filter === 'external') this.filters.parameters= { ...this.filters.parameters, external: !this.filters.parameters.external };
    else if (filter === 'note') this.filters.note= !this.filters.note;
  }

  onSelectActivities(activities: Activity[]) {
    this.filters.activities= activities;
  }

  onSearch() {
    const extrasData: NavigationExtras= { state: this.filters };

    this.store.dispatch(fetchSearchMood({ filters: { ...this.filters } }));
    this.router.navigate(['/moods/search-results'], extrasData);
  }
}
