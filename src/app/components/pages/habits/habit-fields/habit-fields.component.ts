import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { Habit } from 'src/app/models/habit.model';
import { collapseAnimation } from 'src/app/animations/utilities.animation';
import { daysBetweenDates, transformDateTime } from 'src/app/utilities/helpers';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'habit-fields',
  templateUrl: './habit-fields.component.html',
  styleUrls: ['./habit-fields.component.scss'],
})
export class HabitFieldsComponent implements OnInit, AfterViewInit {
  @Input() habit: Habit;
  @Input() habitId: number;
  @Output() onSubmitEvent: EventEmitter<{}>= new EventEmitter<{}>();
  @ViewChild('selectReminderTime', { static: true }) selectReminderTimeElement: ElementRef;
  
  public selectedType: string= 'to do';
  private selectedDay;
  public defaultReminderTime: string= transformDateTime(new Date()).toTime();
  private validGoalDates: boolean= false;
  public formGroup: FormGroup;

  constructor(
    private alertController: AlertController, 
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();

    if (this.habit) { 
      this.selectedType= this.habit.type;
      this.defaultReminderTime= this.habit.reminderTime;
      this.formGroup.patchValue({ ...this.habit });
      this.formGroup.updateValueAndValidity();
    }

    this.validateGoalDates();
    this.formGroup.controls['goalDates'].valueChanges.subscribe(value => {
      this.validateGoalDates();
    });
  }

  ngAfterViewInit() {
    if (this.habit && this.habit.reminderTime !== '') {
      this.selectReminderTimeElement.nativeElement.style.overflow= 'auto';
    } else {
      this.selectReminderTimeElement.nativeElement.style.height= 0;
      this.selectReminderTimeElement.nativeElement.style.overflow= 'hidden';
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get type() {
    return this.formGroup.get('type');
  }

  get day() {
    return this.formGroup.get('day');
  }

  get goal() {
    return this.formGroup.get('goal');
  }

  get goalStartDate() {
    return this.formGroup.get('goalDates.start');
  }

  get goalEndDate() {
    return this.formGroup.get('goalDates.end');
  }

  get reminderTime() {
    return this.formGroup.get('reminderTime');
  }

  get labelColor() {
    return this.formGroup.get('labelColor');
  }

  initializeForm() {
    this.formGroup= this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control(''),
      type: this.formBuilder.control(this.selectedType),
      day: this.formBuilder.control(''),
      goal: this.formBuilder.control(null, [Validators.required]),
      goalDates: this.formBuilder.group({
        start: this.formBuilder.control('', [Validators.required]),
        end: this.formBuilder.control('', [Validators.required]),
      }),
      reminderTime: this.formBuilder.control(''),
      labelColor: this.formBuilder.control('')
    });
  }

  validateGoalDates() {
    const days= daysBetweenDates(this.formGroup.get('goalDates.start').value, this.formGroup.get('goalDates.end').value);

    if (!days && (this.formGroup.get('goalDates.start').value !== '' && this.formGroup.get('goalDates.end').value !== '')) {
      this.validGoalDates= false;
      (async () => {
        const alert= await this.alertController.create({ message: 'Tanggal dimulai dan selesai tidak valid!', buttons: ['OK'] });
        alert.present(); 
      })();
    } else {
      this.validGoalDates= true;
      this.formGroup.controls['goal'].setValue(days);
    }
  }

  onSelectType(type: string) {
    this.selectedType= type;
    this.formGroup.controls['type'].setValue(this.selectedType);
  }

  onSelectDay(day) {
    if (day.id === -1) {
      this.formGroup.controls['goal'].enable();
    } else {  
      this.formGroup.controls['goal'].disable();
    }

    this.selectedDay= day;
    this.formGroup.controls['day'].setValue(day.name);
  }

  async onSelectGoalDate(field: string) {
    const modal= await this.modalController.create({
      component: CalendarPage,
      componentProps: {
        ...this.habit && { 
          selectedDate: field === 'startDate' ? this.formGroup.get('goalDates.start').value : this.formGroup.get('goalDates.end').value
        },
        enabledDate: this.selectedDay.id
      },
      cssClass: 'auto-height-modal rounded-modal'
    });
    modal.present(); 

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedDate) {
      if (field === 'startDate') {
        this.formGroup.get('goalDates.start').setValue(transformDateTime(data.selectedDate).toISODate());
      } else {
        this.formGroup.get('goalDates.end').setValue(transformDateTime(data.selectedDate).toISODate());
      }
    }
  }

  onSelectLabelColor(color: string) {
    this.formGroup.controls['labelColor'].setValue(color);
  }

  onChangeReminderTime(event) {
    if (!event.target.checked) {
      this.formGroup.controls['reminderTime'].setValue('');   
      collapseAnimation('select-reminder-time', this.selectReminderTimeElement)
        .direction('reverse')
        .play();
    } else {
      collapseAnimation('select-reminder-time', this.selectReminderTimeElement)
        .direction('alternate')
        .play();
    }
  }

  async onSubmit() {
    const alert= await this.alertController.create({ buttons: ['OK'] });

    if (this.formGroup.invalid) {
       alert.message= 'Nama, Goal Frekuensi dan Tanggal wajib diisi!';
    } else {
      if (!this.validGoalDates) {
        alert.message= 'Tanggal dimulai dan selesai tidak valid!';
      } else {
        this.onSubmitEvent.emit(this.formGroup.getRawValue()); 
      }
    }

    if (alert.message) {
      alert.present();
    }
  }
}
