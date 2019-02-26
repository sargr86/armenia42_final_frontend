import { TestBed } from '@angular/core/testing';

import { ProvinceResolverService } from './province-resolver.service';

describe('ProvinceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvinceResolverService = TestBed.get(ProvinceResolverService);
    expect(service).toBeTruthy();
  });
});
