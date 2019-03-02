import { TestBed } from '@angular/core/testing';

import { StoryResolverService } from './story-resolver.service';

describe('StoryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryResolverService = TestBed.get(StoryResolverService);
    expect(service).toBeTruthy();
  });
});
