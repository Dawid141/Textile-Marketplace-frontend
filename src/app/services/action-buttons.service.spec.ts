import { TestBed } from '@angular/core/testing';

import { ActionButtonsService } from './action-buttons.service';

describe('ActionButtonsService', () => {
  let service: ActionButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
