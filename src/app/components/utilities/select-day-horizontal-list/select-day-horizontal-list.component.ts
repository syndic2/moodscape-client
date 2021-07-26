import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-day-horizontal-list',
  templateUrl: './select-day-horizontal-list.component.html',
  styleUrls: ['./select-day-horizontal-list.component.scss'],
})
export class SelectDayHorizontalListComponent implements OnInit {
  @Input() selectedDay: string;
  @Output() selectDayEvent: EventEmitter<string>= new EventEmitter();

  public days= [
    { name: 'all days', label: 'Setiap Hari' },
    { name: 'monday', label: 'Senin' },
    { name: 'tuesday', label: 'Selasa' },
    { name: 'wednesday', label: 'Rabu' },
    { name: 'thursday', label: 'Kamis' },
    { name: 'friday', label: 'Jumat' },
    { name: 'saturday', label: 'Sabtu' },
    { name: 'sunday', label: 'Minggu' },
  ];  

  constructor() { }

  ngOnInit() {}

  onSelectDay(day) {
    this.selectedDay= day.name;
    this.selectDayEvent.emit(day.name);
  }
}
