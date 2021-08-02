import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-day-horizontal-list',
  templateUrl: './select-day-horizontal-list.component.html',
  styleUrls: ['./select-day-horizontal-list.component.scss'],
})
export class SelectDayHorizontalListComponent implements OnInit {
  public days= [
    { id: -1, name: 'all day', label: 'Setiap Hari' },
    { id: 1, name: 'monday', label: 'Senin' },
    { id: 2, name: 'tuesday', label: 'Selasa' },
    { id: 3, name: 'wednesday', label: 'Rabu' },
    { id: 4, name: 'thursday', label: 'Kamis' },
    { id: 5, name: 'friday', label: 'Jumat' },
    { id: 6, name: 'saturday', label: 'Sabtu' },
    { id: 0, name: 'sunday', label: 'Minggu' },
  ];
   
  @Input() selectedDay:string = this.days[0].name;
  @Output() selectDayEvent: EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.selectDayEvent.emit(this.days[0]);
  }

  onSelectDay(day) {
    this.selectedDay= day.name;
    this.selectDayEvent.emit(day);
  }
}
