import { TestBed } from '@angular/core/testing';

import { TipoplatoService } from './tipoplato.service';

describe('TipoplatoService', () => {
  let service: TipoplatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoplatoService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
