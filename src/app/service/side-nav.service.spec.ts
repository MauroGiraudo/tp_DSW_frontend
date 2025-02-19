import { TestBed } from '@angular/core/testing';

import { SideNavService } from './side-nav.service';

describe('SideNavService', () => {
  let service: SideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideNavService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
