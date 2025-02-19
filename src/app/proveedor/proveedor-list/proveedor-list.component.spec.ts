import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorListComponent } from './proveedor-list.component';

describe('ProveedorListComponent', () => {
  let component: ProveedorListComponent;
  let fixture: ComponentFixture<ProveedorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorListComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El listado de proveedores está vacío', () => {
    component.getProveedores()
    expect(component.proveedores).toEqual([]);
  });

  //AVERIGUAR CÓMO LOGRAR QUE PRIMERO SE ASIGNEN LOS PROVEEDORES PROVENIENTES DEL BACK A LA VARIABLE "proveedores" PARA LUEGO
  // TESTEAR SI FUERON RECUPERADOS O NO
});
