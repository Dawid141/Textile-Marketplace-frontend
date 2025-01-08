import { TestBed } from '@angular/core/testing';

import { SingleOfferService } from './single-offer.service';

describe('SingleOfferService', () => {
  let service: SingleOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
