import { TestBed } from '@angular/core/testing';

import { DesignUtilityService } from './design-utility.service';

describe('DesignUtilityService', () => {
  let service: DesignUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
