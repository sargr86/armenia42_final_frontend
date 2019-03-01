import { TestBed } from '@angular/core/testing';

import { ProvincesResolverService } from './province-resolver.service';

describe('ProvincesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvincesResolverService = TestBed.get(ProvincesResolverService);
    expect(service).toBeTruthy();
  });
});
