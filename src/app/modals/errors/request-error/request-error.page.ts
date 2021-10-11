import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-request-error',
  templateUrl: './request-error.page.html',
  styleUrls: ['./request-error.page.scss'],
})
export class RequestErrorPage implements OnInit {
  @Input() message: string;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
