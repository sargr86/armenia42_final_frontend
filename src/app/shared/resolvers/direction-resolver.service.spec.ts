import { TestBed } from '@angular/core/testing';

import { DirectionResolverService } from './direction-resolver.service';

describe('DirectionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectionResolverService = TestBed.get(DirectionResolverService);
    expect(service).toBeTruthy();
  });
});
