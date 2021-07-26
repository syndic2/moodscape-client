import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { collapseAnimation } from 'src/app/animations/utilities.animation';
import { createHabit } from 'src/app/store/actions/habits.actions';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.page.html',
  styleUrls: ['./create-habit.page.scss'],
})
export class CreateHabitPage implements OnInit, AfterViewInit {
  @ViewChild('selectReminderAt') selectReminderAtElement: ElementRef;
  
  public selectedType: string= 'to do';
  public selectedDay: string= 'all days';
  private selectedLabelColor: string;

  constructor(private store: Store, private alertController: AlertController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.selectReminderAtElement.nativeElement.style.height= 0;
    this.selectReminderAtElement.nativeElement.style.overflow= 'hidden';
  }

  onSelectType(type: string) {
    this.selectedType= type;
  }

  onSelectDay(day) {
    this.selectedDay= day;
  }

  onSelectLabelColor(color: string) {
    this.selectedLabelColor= color;
  }

  onChangeReminderAt(event) {
    if (!event.target.checked) {
      collapseAnimation('select-reminder-at', this.selectReminderAtElement)
        .direction('reverse')
        .play();
    } else {
      collapseAnimation('select-reminder-at', this.selectReminderAtElement)
      .direction('alternate')
      .play();
    }
  }

  async onSubmit(form: NgForm) {
    
  }
}
