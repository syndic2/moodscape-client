import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Mood } from 'src/app/models/mood.model';

@Component({
  selector: 'app-mood-list-by-date',
  templateUrl: './mood-list-by-date.page.html',
  styleUrls: ['./mood-list-by-date.page.scss'],
})
export class MoodListByDatePage implements OnInit {
  public date: Date;
  public moods: Mood[]= [];
  public moodsCount: any= {};

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.date= this.router.getCurrentNavigation().extras.state.date;
      this.moods= this.router.getCurrentNavigation().extras.state.moods;
      this.moodsCount= this.router.getCurrentNavigation().extras.state.moodsCount;
    }
  }
}
