import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { removeMoods } from 'src/app/store/actions/moods.actions';

import { Mood } from 'src/app/models/mood.model';
import { MoodService } from 'src/app/services/mood/moods.service';

@Component({
  selector: 'app-mood-popover',
  templateUrl: './mood-popover.component.html',
  styleUrls: ['./mood-popover.component.scss'],
})
export class MoodPopoverComponent implements OnInit {
  @Input() mood: Mood;

  constructor(
    private store: Store,
    private router: Router,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private moodService: MoodService
  ) { }
    
  ngOnInit() {}

  onUpdate() {
    this.popoverController.dismiss();
    this.router.navigate(['/moods', this.mood.Id]);
  }

  async onRemove() {
    this.popoverController.dismiss();

    const alert= await this.alertController.create({
      subHeader: 'Anda akan menghapus data mood ini',
      message: 'Apakah anda yakin ingin menghapus data mood ini?',
      buttons: [
        {
          text: 'Tetap simpan',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.store.dispatch(removeMoods({ moodIds: [this.mood.Id]}));
          }
        }
      ]
    });
    alert.present();
  }
}
