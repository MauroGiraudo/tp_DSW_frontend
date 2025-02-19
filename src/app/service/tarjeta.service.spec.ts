import { TestBed } from '@angular/core/testing';

import { TarjetaService } from './tarjeta.service';

describe('TarjetaService', () => {
  let service: TarjetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
