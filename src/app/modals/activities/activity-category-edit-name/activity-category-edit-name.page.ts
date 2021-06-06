import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-category-edit-name',
  templateUrl: './activity-category-edit-name.page.html',
  styleUrls: ['./activity-category-edit-name.page.scss'],
})
export class ActivityCategoryEditNamePage implements OnInit {
  @Input() activityCategoryName: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  onChangeName(event) {
    this.activityCategoryName= event.target.value;
  }

  onUpdate() {
    this.modalController.dismiss({
      fields: { category: this.activityCategoryName }
    });
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
