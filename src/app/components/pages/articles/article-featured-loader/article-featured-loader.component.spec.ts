import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticleFeaturedLoaderComponent } from './article-featured-loader.component';

describe('ArticleFeaturedLoaderComponent', () => {
  let component: ArticleFeaturedLoaderComponent;
  let fixture: ComponentFixture<ArticleFeaturedLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFeaturedLoaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleFeaturedLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
