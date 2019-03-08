import { TestBed } from '@angular/core/testing';

import { ImageResolverService } from './image-resolver.service';

describe('ImageResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageResolverService = TestBed.get(ImageResolverService);
    expect(service).toBeTruthy();
  });
});
