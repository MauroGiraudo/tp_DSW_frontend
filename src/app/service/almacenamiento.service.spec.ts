import { TestBed } from '@angular/core/testing';

import { AlmacenamientoService } from './almacenamiento.service';

describe('AlmacenamientoServiceService', () => {
  let service: AlmacenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
