import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityCategoryEditNamePage } from './activity-category-edit-name.page';

describe('ActivityCategoryEditNamePage', () => {
  let component: ActivityCategoryEditNamePage;
  let fixture: ComponentFixture<ActivityCategoryEditNamePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCategoryEditNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityCategoryEditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
