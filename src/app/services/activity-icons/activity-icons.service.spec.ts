import { TestBed } from '@angular/core/testing';

import { ActivityIconsService } from './activity-icons.service';

describe('ActivityIconsService', () => {
  let service: ActivityIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
