import { Component, OnInit, Input } from '@angular/core';

import { PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { Mood } from 'src/app/models/mood.model';
import { navigateGo } from 'src/app/store/actions/router.actions';
import { removeMoodsConfirmation } from 'src/app/store/actions/mood.actions';

@Component({
  selector: 'app-mood-popover',
  templateUrl: './mood-popover.component.html',
  styleUrls: ['./mood-popover.component.scss'],
})
export class MoodPopoverComponent implements OnInit {
  @Input() mood: Mood;

  constructor(private store: Store, private popoverController: PopoverController) { }
    
  ngOnInit() {}

  onUpdate() {
    this.popoverController.dismiss();
    this.store.dispatch(navigateGo({ path: ['/moods', this.mood.Id] }));
  }

  onRemove() {
    this.popoverController.dismiss();
    this.store.dispatch(removeMoodsConfirmation({ moodIds: [this.mood.Id] }));
  }
}
