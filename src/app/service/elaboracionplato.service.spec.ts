import { TestBed } from '@angular/core/testing';

import { ElaboracionplatoService } from './elaboracionplato.service';

describe('ElaboracionplatoService', () => {
  let service: ElaboracionplatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElaboracionplatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
