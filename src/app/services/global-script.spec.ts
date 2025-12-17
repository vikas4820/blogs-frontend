import { TestBed } from '@angular/core/testing';

import { GlobalScript } from './global-script';

describe('GlobalScript', () => {
  let service: GlobalScript;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalScript);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
