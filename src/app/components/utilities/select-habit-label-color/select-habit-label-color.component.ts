import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HABIT_LABEL_COLOR } from 'src/app/models/habit.model';

@Component({
  selector: 'select-habit-label-color',
  templateUrl: './select-habit-label-color.component.html',
  styleUrls: ['./select-habit-label-color.component.scss'],
})
export class SelectHabitLabelColorComponent implements OnInit {
  @Input() selectedColor: string;
  @Output() selectColorEvent: EventEmitter<string>= new EventEmitter();

  public labelColors: string[]= [
    HABIT_LABEL_COLOR.RED,
    HABIT_LABEL_COLOR.PINK,
    HABIT_LABEL_COLOR.ORANGE,
    HABIT_LABEL_COLOR.BLUE,
    HABIT_LABEL_COLOR.GREEN
  ];

  constructor() { }

  ngOnInit() {}

  onSelectColor(color: string) {
    this.selectedColor= color;
    this.selectColorEvent.emit(color);
  }
}