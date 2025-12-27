import { TestBed } from '@angular/core/testing';

import { BlogTestimonialService } from './blog-testimonial-service';

describe('BlogTestimonialService', () => {
  let service: BlogTestimonialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogTestimonialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
