import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatbotMessageFeedbackPage } from './chatbot-message-feedback.page';

describe('ChatbotMessageFeedbackPage', () => {
  let component: ChatbotMessageFeedbackPage;
  let fixture: ComponentFixture<ChatbotMessageFeedbackPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotMessageFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotMessageFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
