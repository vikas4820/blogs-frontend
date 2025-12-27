import { TestBed } from '@angular/core/testing';

import { BlogSliderService } from './blog-slider-service';

describe('BlogSliderService', () => {
  let service: BlogSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
