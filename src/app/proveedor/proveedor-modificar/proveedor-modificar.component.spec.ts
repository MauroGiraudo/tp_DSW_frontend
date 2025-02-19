import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorModificarComponent } from './proveedor-modificar.component';

describe('ProveedorModificarComponent', () => {
  let component: ProveedorModificarComponent;
  let fixture: ComponentFixture<ProveedorModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
