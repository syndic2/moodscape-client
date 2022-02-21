import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { collapseAnimation } from 'src/app/animations/utilities.animation';
import { daysBetweenDates, transformDateTime } from 'src/app/utilities/helpers';
import { Habit } from 'src/app/models/habit.model';
import { showAlert } from 'src/app/store/actions/application.actions';
// import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'habit-fields',
  templateUrl: './habit-fields.component.html',
  styleUrls: ['./habit-fields.component.scss'],
})
export class HabitFieldsComponent implements OnInit, AfterViewInit {
  @Input() habit: Habit;
  @Input() habitId: number;
  @Output() onSubmitEvent: EventEmitter<{}> = new EventEmitter<{}>();
  @ViewChild('selectReminderTime', { static: true }) selectReminderTimeElement: ElementRef;

  public selectedType: string = 'to do';
  //private selectedDay;
  public defaultReminderTime: string = transformDateTime(new Date()).toTime();
  private validGoalDates: boolean = false;
  public formGroup: FormGroup;

  constructor(
    private store: Store,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();

    if (this.habit) {
      this.selectedType = this.habit.type;
      this.defaultReminderTime = this.habit.reminderTime;
      this.validGoalDates = true;
      this.formGroup.patchValue({ ...this.habit });
      this.formGroup.updateValueAndValidity();
    }

    this.goalDates.valueChanges.subscribe(value => {
      if (value.start !== '' && value.end !== '') {
        const days = daysBetweenDates(value.start, value.end);

        if (!days) {
          this.validGoalDates = false;
          this.store.dispatch(
            showAlert({
              options: {
                message: 'Tanggal dimulai dan selesai tidak valid!',
                buttons: ['OK']
              }
            })
          );
        } else {
          this.validGoalDates = true;
          this.goal.setValue(days + 1);
        }
      }
    });

    this.goalStartDate.valueChanges.subscribe(value => {
      if (this.habit && value !== this.habit.goalDates.start) {
        this.store.dispatch(
          showAlert({
            options: {
              message: 'Apabila anda mengubah tanggal dimulai, maka progres habit akan tereset dari awal lagi, apaka anda yakin ingin mengubah?',
              buttons: [
                {
                  text: 'Ya'
                },
                {
                  text: 'Tidak',
                  handler: () => {
                    this.goalStartDate.setValue(this.habit.goalDates.start);
                  }
                }
              ]
            }
          })
        );
      }
    })
  }

  ngAfterViewInit() {
    if (this.habit && this.habit.reminderTime !== '') {
      this.selectReminderTimeElement.nativeElement.style.overflow = 'auto';
      this.isReminder.setValue(true);
    } else {
      this.selectReminderTimeElement.nativeElement.style.height = 0;
      this.selectReminderTimeElement.nativeElement.style.overflow = 'hidden';
      this.isReminder.setValue(false);
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

  get goalDates() {
    return this.formGroup.get('goalDates');
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

  get isReminder() {
    return this.formGroup.get('isReminder');
  }

  get labelColor() {
    return this.formGroup.get('labelColor');
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control(''),
      type: this.formBuilder.control(this.selectedType),
      day: this.formBuilder.control('all day'),
      goal: this.formBuilder.control(0, [Validators.required]),
      goalDates: this.formBuilder.group({
        start: this.formBuilder.control('', [Validators.required]),
        end: this.formBuilder.control('', [Validators.required]),
      }),
      reminderTime: this.formBuilder.control(''),
      isReminder: this.formBuilder.control(false),
      labelColor: this.formBuilder.control('')
    });
    this.goal.disable();
    this.goalStartDate.disable();
    this.goalEndDate.disable();
  }

  onSelectType(type: string) {
    this.selectedType = type;
    this.type.setValue(this.selectedType);
  }

  //onSelectDay(day) {
  //  //if (day.id === -1) {
  //  //  this.formGroup.controls['goal'].enable();
  //  //} else {
  //  //  this.formGroup.controls['goal'].disable();
  //  //}

  //  this.selectedDay= day;
  //  this.day.setValue(day.name);
  //}

  async onSelectGoalDate(field: string) {
    const { CalendarPageModule } = await import('../../../../modals/calendar/calendar.module');
    const modal = await this.modalController.create({
      component: CalendarPageModule.getComponent(),
      componentProps: {
        ...this.habit && {
          selectedDate: field === 'startDate' ? this.goalStartDate.value : this.goalEndDate.value
        },
        disablePastDate: true
        //enabledDate: this.selectedDay.id
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.selectedDate) {
      if (field === 'startDate') {
        this.goalStartDate.setValue(transformDateTime(data.selectedDate).toISODate());
      } else {
        this.goalEndDate.setValue(transformDateTime(data.selectedDate).toISODate());
      }
    }
  }

  onSelectLabelColor(color: string) {
    this.labelColor.setValue(color);
  }

  onChangeReminderTime(event) {
    if (!event.target.checked) {
      this.isReminder.setValue(false);
      collapseAnimation('select-reminder-time', this.selectReminderTimeElement)
        .direction('reverse')
        .play();
    } else {
      this.isReminder.setValue(true);
      collapseAnimation('select-reminder-time', this.selectReminderTimeElement)
        .direction('alternate')
        .play();
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return this.store.dispatch(
        showAlert({
          options: {
            message: 'Nama, Goal Frekuensi dan Tanggal wajib diisi!',
            buttons: ['OK']
          }
        })
      );
    }

    if (!this.validGoalDates) {
      return this.store.dispatch(
        showAlert({
          options: {
            message: 'Tanggal dimulai dan selesai tidak valid!',
            buttons: ['OK']
          }
        })
      );
    }

    this.onSubmitEvent.emit(this.formGroup.getRawValue());
  }
}
