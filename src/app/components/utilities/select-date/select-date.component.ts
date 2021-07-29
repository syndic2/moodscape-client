import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { ModalController } from '@ionic/angular';

import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
})
export class SelectDateComponent implements OnInit {
  @Input() selectedDate: Date= new Date();
  @Output() selectDateEvent= new EventEmitter<Date>();
  @ViewChild('selectDateTemplate', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef, private modalController: ModalController) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.selectDateEvent.emit(this.selectedDate);
  }

  async onSelectDate() {
    const modal= await this.modalController.create({
      component: CalendarPage,
      componentProps: {
        selectedDate: this.selectedDate
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.selectedDate) {
      this.selectedDate= data.selectedDate;
      this.selectDateEvent.emit(data.selectedDate);
    }
  }
}
