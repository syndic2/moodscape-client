import { Component, OnInit, Input } from '@angular/core';
import { MoodFilter } from 'src/app/models/mood.model';

@Component({
  selector: 'mood-search-filters',
  templateUrl: './mood-search-filters.component.html',
  styleUrls: ['./mood-search-filters.component.scss'],
})
export class MoodSearchFiltersComponent implements OnInit {
  @Input() filters: MoodFilter;

  constructor() { }

  ngOnInit() {}

}
