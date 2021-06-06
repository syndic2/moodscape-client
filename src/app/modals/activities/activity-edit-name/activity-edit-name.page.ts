import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-edit-name',
  templateUrl: './activity-edit-name.page.html',
  styleUrls: ['./activity-edit-name.page.scss'],
})
export class ActivityEditNamePage implements OnInit {
  @Input() activityName: string= 'Nama aktivitas...';

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onChangeName(event) {
    this.activityName= event.target.value;
  }

  onUpdate() {
    this.modalController.dismiss({ fields: { name: this.activityName } });
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
