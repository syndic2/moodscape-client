import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectMood } from 'src/app/store/selectors/user-moods-selectors';
import { updateMood } from 'src/app/store/actions/user-moods.actions';

import { Mood } from 'src/app/models/mood.model';
import { UserMoodsService } from 'src/app/services/user-moods/user-moods.service';

@Component({
  selector: 'app-mood-detail',
  templateUrl: './mood-detail.page.html',
  styleUrls: ['./mood-detail.page.scss'],
})
export class MoodDetailPage implements OnInit {
  public mood$: Observable<Mood>= null;
  private moodId: number;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private userMoodsService: UserMoodsService
  ) { }

  ngOnInit() {
    this.moodId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mood$= this.store.select(selectMood({ Id: this.moodId }));
  }

  async onUpdate() {

  }
}
