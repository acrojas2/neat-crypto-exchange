import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet-service.service';

describe('WalletServiceService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
