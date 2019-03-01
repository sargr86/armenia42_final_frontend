import { TestBed } from '@angular/core/testing';

import { RedirectToListService } from './redirect-to-list.service';

describe('RedirectToListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectToListService = TestBed.get(RedirectToListService);
    expect(service).toBeTruthy();
  });
});
