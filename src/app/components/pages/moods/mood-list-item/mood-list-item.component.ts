import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { PopoverController } from '@ionic/angular';

import { Mood } from 'src/app/models/mood.model';
import { poppingAnimation } from 'src/app/animations/utilities.animation';
import { MoodPopoverComponent } from '../mood-popover/mood-popover.component';

@Component({
  selector: 'mood-list-item',
  templateUrl: './mood-list-item.component.html',
  styleUrls: ['./mood-list-item.component.scss'],
})
export class MoodListItemComponent implements OnInit {
  @Input() mood: Mood;
  @Input() hidePopover: boolean= false;
  @Input() removeFromSearchResults: boolean= false;
  @ViewChild('moodItem', { static: true }) moodItem: ElementRef;

  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  async openPopover(event) {
    const popover= await this.popoverController.create({
      event: event,
      component: MoodPopoverComponent,
      componentProps: {
        mood: this.mood,
        removeFromSearchResults: this.removeFromSearchResults
      }
    });
    popover.present();
  }

  onOpenDetail() {
    poppingAnimation('mood-item', this.moodItem).play().finally(() => {
      this.router.navigate(['/moods', this.mood.Id]);
    });
  }
}
