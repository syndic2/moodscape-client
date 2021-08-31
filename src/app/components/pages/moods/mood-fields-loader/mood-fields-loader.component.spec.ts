import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoodFieldsLoaderComponent } from './mood-fields-loader.component';

describe('MoodFieldsLoaderComponent', () => {
  let component: MoodFieldsLoaderComponent;
  let fixture: ComponentFixture<MoodFieldsLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodFieldsLoaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoodFieldsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
