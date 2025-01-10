import { TestBed } from '@angular/core/testing';

import { MyOffersService } from './my-offers.service';

describe('MyOffersService', () => {
  let service: MyOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
