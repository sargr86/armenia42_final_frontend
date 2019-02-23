import { TestBed } from '@angular/core/testing';

import { CountriesResolverService } from './countries-resolver.service';

describe('CountriesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountriesResolverService = TestBed.get(CountriesResolverService);
    expect(service).toBeTruthy();
  });
});
