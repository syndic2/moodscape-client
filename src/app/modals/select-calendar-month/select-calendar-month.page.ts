import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-calendar-month',
  templateUrl: './select-calendar-month.page.html',
  styleUrls: ['./select-calendar-month.page.scss'],
})
export class SelectCalendarMonthPage implements OnInit {
  @Input() selectedMonth: number= 0;

  public months: string[]= [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

  onSelectMonthChange(month: string) {
    this.selectedMonth= this.months.indexOf(month);
  }

  onSelectMonth() {
    this.modalController.dismiss({ selectedMonth: this.selectedMonth });
  }
}

