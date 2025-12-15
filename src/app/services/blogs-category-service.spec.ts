import { TestBed } from '@angular/core/testing';

import { BlogsCategoryService } from './blogs-category-service';

describe('BlogsCategoryService', () => {
  let service: BlogsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
