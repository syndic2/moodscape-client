import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';

import { createMood } from 'src/app/store/actions/user-moods.actions';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-create-detail-mood',
  templateUrl: './create-detail-mood.page.html',
  styleUrls: ['./create-detail-mood.page.scss'],
})
export class CreateDetailMoodPage implements OnInit {
  private fields;
  private selectedActivities: Activity[]= [];

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.fields= this.router.getCurrentNavigation().extras.state;
    }
  }

  onSelectActivities(activities: Activity[]) {
    this.selectedActivities= activities;
  }

  onSubmit(form: NgForm) {
    this.fields= { Id: -3, ...this.fields, ...{
        parameters: {
          internal: form.value.internal,
          external: form.value.external
        },
        activities: this.selectedActivities
      }
    };
    this.store.dispatch(createMood({ mood: this.fields }));
    this.router.navigate(['/side-menu/tabs/moods']);
  }
}
