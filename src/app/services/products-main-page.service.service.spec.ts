import { TestBed } from '@angular/core/testing';

import { ProductsMainPageService } from './products-main-page.service.service';

describe('ProductsMainPageServiceService', () => {
  let service: ProductsMainPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsMainPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
