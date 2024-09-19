import { TestBed } from '@angular/core/testing';

import { MarketsService } from './markets-service.service';

describe('MarketsServiceService', () => {
  let service: MarketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
