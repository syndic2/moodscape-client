import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { setUserMoods } from 'src/app/store/actions/moods.actions';
import { selectMoods } from 'src/app/store/selectors/moods.selectors';

import { Mood } from 'src/app/models/mood.model';
import { MoodService } from 'src/app/services/mood/moods.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
  providers: [
    MoodService,
    { provide: 'skipLoading', useValue: 'true' }
  ]
})
export class MoodsPage implements OnInit {
  public moods$: Observable<Mood[]>= this.store.select(selectMoods);
  private getUserMoodsListener: Subscription= null;
  public isLoading: boolean= false;

  constructor(private store: Store, private mood: MoodService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    /*this.getUserMoodsListener= this.userMoodsService.getMoods().subscribe(res => {
      console.log('res', res);
      //setUserMoods({ userMoods: res });
    });*/
  }

  ionViewWillLeave() {
    this.getUserMoodsListener && this.getUserMoodsListener.unsubscribe();
  }

  pullRefresh(event) {
    event && event.target.complete();
  }
}
