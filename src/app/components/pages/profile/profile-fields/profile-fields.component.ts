import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'profile-fields',
  templateUrl: './profile-fields.component.html',
  styleUrls: ['./profile-fields.component.scss'],
})
export class ProfileFieldsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() errorMessages;
  @ViewChild('profileFields', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
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

  get age() {
    return this.form.get('age');
  }

  get email() {
    return this.form.get('email');
  }
}
