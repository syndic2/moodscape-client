import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-calendar-year',
  templateUrl: './select-calendar-year.page.html',
  styleUrls: ['./select-calendar-year.page.scss'],
})
export class SelectCalendarYearPage implements OnInit {
  @Input() selectedYear: number = new Date().getFullYear();

  public years: number[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    for (let year = 1970; year <= new Date().getFullYear(); year++) {
      this.years.push(year);
    }
  }

  close() {
    this.modalController.dismiss();
  }

  onSelectYearChange(year: number) {
    this.selectedYear = year;
  }

  onSelectYear() {
    this.modalController.dismiss({ selectedYear: this.selectedYear });
  }
}
