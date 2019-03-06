import { TestBed } from '@angular/core/testing';

import { UpdateBreadcrumbsService } from './update-breadcrumbs.service';

describe('UpdateBreadcrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateBreadcrumbsService = TestBed.get(UpdateBreadcrumbsService);
    expect(service).toBeTruthy();
  });
});
