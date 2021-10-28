import { Component, OnInit, OnDestroy, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { calculateAge, transformDateTime } from 'src/app/utilities/helpers';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
  selector: 'profile-fields',
  templateUrl: './profile-fields.component.html',
  styleUrls: ['./profile-fields.component.scss'],
})
export class ProfileFieldsComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() form: FormGroup;
  @Input() errorMessages;
  @ViewChild('profileFields', { static: true }) template;

  private isAgeValid: boolean= true;
  private dateOfBirthSubscription: Subscription;

  constructor(private viewContainerRef: ViewContainerRef, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.dateOfBirthSubscription= this.dateOfBirth.valueChanges.subscribe(async value => {
      if (calculateAge(value) < 12) {
        this.dateOfBirth.setValue('');
        
        const alert= await this.alertController.create({ message: 'Umur anda harus diatas 12 tahun' });
        alert.present();
      }
    })
  }

  ngOnDestroy() {
    this.dateOfBirthSubscription && this.dateOfBirthSubscription.unsubscribe();
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get gender() {
    return this.form.get('gender');
  }

  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }

  get email() {
    return this.form.get('email');
  }

  async onSelectDateOfBirth() {
    const modal= await this.modalController.create({ 
      component: CalendarPage,
      componentProps: {
        ...this.dateOfBirth.value && { selectedDate: this.dateOfBirth.value }, 
      },
      cssClass: 'auto-height-modal rounded-modal wrapper-fit-content' 
    });
    modal.present();

    const { data }= await modal.onWillDismiss();
    if (data && data.selectedDate) {
      this.dateOfBirth.setValue(transformDateTime(data.selectedDate).toISODate());
    }
  }
}
