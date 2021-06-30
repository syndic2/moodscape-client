import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

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
  public moods: Mood[]= [];
  private getUserMoodsListener: Subscription= null;
  private isLoading: boolean= true;

  constructor(private userMoodsService: UserMoodsService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    /*this.getUserMoodsListener= this.userMoodsService.getMoods().subscribe(res => {

    });*/
  }

  ionViewWillLeave() {
    this.getUserMoodsListener && this.getUserMoodsListener.unsubscribe();
  }

  async onSearchChange() {

  }

  async onSubmit() {

  }
}
