import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formProtectGuard } from './form-protect.guard';

describe('formProtectGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formProtectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
