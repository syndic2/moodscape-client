import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { setUserMoods } from 'src/app/store/actions/user-moods.actions';
import { selectMoods } from 'src/app/store/selectors/user-moods-selectors';

import { Mood } from 'src/app/models/mood.model';
import { UserMoodsService } from 'src/app/services/user-moods/user-moods.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
  providers: [
    UserMoodsService,
    { provide: 'skipLoading', useValue: 'true' }
  ]
})
export class MoodsPage implements OnInit {
  public moods$: Observable<Mood[]>= this.store.select(selectMoods);
  private getUserMoodsListener: Subscription= null;
  private isLoading: boolean= true;

  constructor(private store: Store, private userMoodsService: UserMoodsService) { }

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

  async onSearchChange(event) {

  }
}
