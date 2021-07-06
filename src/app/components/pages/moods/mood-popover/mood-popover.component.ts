import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, PopoverController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { removeMoods } from 'src/app/store/actions/user-moods.actions';

import { Mood } from 'src/app/models/mood.model';
import { UserMoodsService } from 'src/app/services/user-moods/user-moods.service';

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
    private userMoodsService: UserMoodsService
  ) { }

  ngOnInit() {}

  onUpdate() {
    this.popoverController.dismiss();
    this.router.navigate(['/side-menu/tabs/moods/detail', this.mood.Id]);
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
