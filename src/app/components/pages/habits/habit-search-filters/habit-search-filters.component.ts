import { Component, OnInit, Input } from '@angular/core';

import { HabitFilter } from 'src/app/models/habit.model';

@Component({
  selector: 'habit-search-filters',
  templateUrl: './habit-search-filters.component.html',
  styleUrls: ['./habit-search-filters.component.scss'],
})
export class HabitSearchFiltersComponent implements OnInit {
  @Input() filters: HabitFilter;

  constructor() { }

  ngOnInit() { }
}
