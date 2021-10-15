import { TestBed } from '@angular/core/testing';

import { ChatEmotionsService } from './chat-emotions.service';

describe('ChatEmotionsService', () => {
  let service: ChatEmotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatEmotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
