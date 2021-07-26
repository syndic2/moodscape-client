import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectHabitLabelColorComponent } from './select-habit-label-color.component';

describe('SelectHabitLabelColorComponent', () => {
  let component: SelectHabitLabelColorComponent;
  let fixture: ComponentFixture<SelectHabitLabelColorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHabitLabelColorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHabitLabelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
