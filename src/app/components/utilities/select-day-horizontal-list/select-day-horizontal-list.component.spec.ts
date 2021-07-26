import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectDayHorizontalListComponent } from './select-day-horizontal-list.component';

describe('SelectDayHorizontalListComponent', () => {
  let component: SelectDayHorizontalListComponent;
  let fixture: ComponentFixture<SelectDayHorizontalListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDayHorizontalListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDayHorizontalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
