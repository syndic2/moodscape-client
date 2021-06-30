import { TestBed } from '@angular/core/testing';

import { UserMoodsService } from './user-moods.service';

describe('UserMoodsService', () => {
  let service: UserMoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
