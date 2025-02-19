import { TestBed } from '@angular/core/testing';

import { ResenaService } from './resena.service';

describe('ResenaService', () => {
  let service: ResenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResenaService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
