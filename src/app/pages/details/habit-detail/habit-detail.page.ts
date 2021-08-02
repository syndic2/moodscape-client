import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.page.html',
  styleUrls: ['./habit-detail.page.scss'],
})
export class HabitDetailPage implements OnInit {
  public habitId: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.habitId= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }
}
