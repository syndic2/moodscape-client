import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Activity } from 'src/app/models/activity.model';
import { fetchCreateMood } from 'src/app/store/actions/mood.actions';

@Component({
  selector: 'app-create-detail-mood',
  templateUrl: './create-detail-mood.page.html',
  styleUrls: ['./create-detail-mood.page.scss'],
})
export class CreateDetailMoodPage implements OnInit {
  public createMoodForm: FormGroup;

  constructor(private store: Store, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();

    if (this.router.getCurrentNavigation().extras.state) {
      this.createMoodForm.patchValue({ ...this.router.getCurrentNavigation().extras.state });
    }
  }

  initializeForm() {
    this.createMoodForm= this.formBuilder.group({
      emoticon: this.formBuilder.control(null),
      createdAt: this.formBuilder.group({
        date: this.formBuilder.control(''),
        time: this.formBuilder.control('')
      }),
      parameters: this.formBuilder.group({
        internal: this.formBuilder.control(''),
        external: this.formBuilder.control('')
      }),
      activities: this.formBuilder.control([]),
      note: this.formBuilder.control('')
    });
  }

  onSelectActivities(activities: Activity[]) {
    this.createMoodForm.controls['activities'].setValue(activities.map(activity => activity.Id));
  }

  onSubmit() {
    this.store.dispatch(fetchCreateMood({ fields: this.createMoodForm.value }));
    this.router.navigate(['/side-menu/tabs/moods']);
  }
}
