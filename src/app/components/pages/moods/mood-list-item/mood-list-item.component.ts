import { Component, OnInit, Input } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Mood } from 'src/app/models/mood.model';
import { MoodPopoverComponent } from '../mood-popover/mood-popover.component';

@Component({
  selector: 'mood-list-item',
  templateUrl: './mood-list-item.component.html',
  styleUrls: ['./mood-list-item.component.scss'],
})
export class MoodListItemComponent implements OnInit {
  @Input() mood: Mood;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async openPopover(event) {
    const popover= await this.popoverController.create({
      event: event,
      component: MoodPopoverComponent,
      componentProps: {
        mood: this.mood
      },
      translucent: true
    });
    popover.present();
  }
}
