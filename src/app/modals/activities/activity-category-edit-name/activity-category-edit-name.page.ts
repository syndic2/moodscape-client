import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-category-edit-name',
  templateUrl: './activity-category-edit-name.page.html',
  styleUrls: ['./activity-category-edit-name.page.scss'],
})
export class ActivityCategoryEditNamePage implements OnInit {
  @Input() categoryName: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  onChangeName(event) {
    this.categoryName= event.target.value;
  }

  onUpdate() {
    this.modalController.dismiss({ fields: { category: this.categoryName } });
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
