import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HABIT_LABEL_COLORS } from 'src/app/models/habit.model';

@Component({
  selector: 'select-habit-label-color',
  templateUrl: './select-habit-label-color.component.html',
  styleUrls: ['./select-habit-label-color.component.scss'],
})
export class SelectHabitLabelColorComponent implements OnInit {
  @Input() selectedColor: string= '';
  @Output() selectColorEvent: EventEmitter<string>= new EventEmitter();

  public labelColors: string[]= [
    HABIT_LABEL_COLORS.RED,
    HABIT_LABEL_COLORS.PINK,
    HABIT_LABEL_COLORS.ORANGE,
    HABIT_LABEL_COLORS.BLUE,
    HABIT_LABEL_COLORS.GREEN
  ];

  constructor() { }

  ngOnInit() {
    if (this.selectedColor === '') {
      this.selectedColor= this.labelColors[0];
      this.selectColorEvent.emit(this.labelColors[0]);
    } else {
      this.selectColorEvent.emit(this.selectedColor);
    }
  }

  onSelectColor(color: string) {
    this.selectedColor= color;
    this.selectColorEvent.emit(color);
  }
}
