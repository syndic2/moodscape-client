import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-internet-connection-error',
  templateUrl: './internet-connection-error.page.html',
  styleUrls: ['./internet-connection-error.page.scss'],
})
export class InternetConnectionErrorPage implements OnInit {
  @Input() message: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
