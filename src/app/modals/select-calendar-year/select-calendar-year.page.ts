import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-calendar-year',
  templateUrl: './select-calendar-year.page.html',
  styleUrls: ['./select-calendar-year.page.scss'],
})
export class SelectCalendarYearPage implements OnInit {
  @Input() selectedYear: number= 2021;

  public years: number[]= [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    for (let year= 1970; year<=2050; year++) {
      this.years.push(year);
    }
  }

  close() {
    this.modalController.dismiss();
  }

  onSelectYearChange(year: number) {
    this.selectedYear= year;
  }

  onSelectYear() {
    this.modalController.dismiss({ selectedYear: this.selectedYear });
  }
}
