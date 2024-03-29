import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {
  @Input() selectedDate: Date | string;
  @Output() selectDateEvent = new EventEmitter<Date | string>();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (!this.selectedDate && this.selectedDate !== '') this.selectedDate = new Date();

    this.selectDateEvent.emit(this.selectedDate);
  }

  async onSelectDate() {
    const { CalendarPageModule } = await import('../../../modals/calendar/calendar.module');
    const modal = await this.modalController.create({
      component: CalendarPageModule.getComponent(),
      componentProps: {
        selectedDate: this.selectedDate
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.selectedDate) {
      this.selectedDate = data.selectedDate;
      this.selectDateEvent.emit(data.selectedDate);
    }
  }
}
