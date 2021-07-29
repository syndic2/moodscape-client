import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { Store } from '@ngrx/store';

import { collapseAnimation } from 'src/app/animations/utilities.animation';
import { transformDateTime } from 'src/app/utilities/helpers';
import { createHabit } from 'src/app/store/actions/habits.actions';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.page.html',
  styleUrls: ['./create-habit.page.scss'],
})
export class CreateHabitPage implements OnInit, AfterViewInit {
  @ViewChild('selectReminderAt') selectReminderAtElement: ElementRef;
  
  public selectedType: string= 'to do';
  private selectedDay: number;
  public selectedGoalTargetDate: Date;
  public defaultReminderTime: string= transformDateTime(new Date()).toTime();
  public createHabitForm: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController, 
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  ngAfterViewInit() {
    this.selectReminderAtElement.nativeElement.style.height= 0;
    this.selectReminderAtElement.nativeElement.style.overflow= 'hidden';
  }

  initializeForm() {
    this.createHabitForm= this.formBuilder.group({
      name: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      type: this.formBuilder.control(''),
      day: this.formBuilder.control(''),
      goal: this.formBuilder.control(0),
      completeTargetBy: this.formBuilder.control(''),
      reminderAt: this.formBuilder.control(''),
      labelColor: this.formBuilder.control('')
    });
  }

  onSelectType(type: string) {
    this.selectedType= type;
  }

  onSelectDay(day) {
    this.createHabitForm.controls['day'].setValue(day);
  }

  async onSelectGoalTargetDate() {
    const modal= await this.modalController.create({
      component: CalendarPage,
      componentProps: {
        enabledDate: this.selectedDay
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present(); 

    const { data }= await modal.onWillDismiss();

    if (data && data.selectedDate) {
      this.selectedGoalTargetDate= data.selectedDate;
      this.createHabitForm.controls['completeTargetBy'].setValue(data.selectedDate);
    }
  }

  onSelectLabelColor(color: string) {
    this.createHabitForm.controls['labelColor'].setValue(color);
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

  async onSubmit() {
    console.log('value', this.createHabitForm.value);
  }
}
