import { TestBed } from '@angular/core/testing';

import { PaidForOrNotService } from './paid-for-or-not.service';

describe('PaidForOrNotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaidForOrNotService = TestBed.get(PaidForOrNotService);
    expect(service).toBeTruthy();
  });
});
