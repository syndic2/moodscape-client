import { TestBed } from '@angular/core/testing';

import { MoodService } from './moods.service';

describe('MoodService', () => {
  let service: MoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
