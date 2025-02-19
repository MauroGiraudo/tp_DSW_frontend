import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorEliminarComponent } from './proveedor-eliminar.component';

describe('ProveedorEliminarComponent', () => {
  let component: ProveedorEliminarComponent;
  let fixture: ComponentFixture<ProveedorEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
