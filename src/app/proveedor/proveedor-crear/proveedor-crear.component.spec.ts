import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorCrearComponent } from './proveedor-crear.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProveedorCrearComponent', () => {
  let component: ProveedorCrearComponent;
  let fixture: ComponentFixture<ProveedorCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorCrearComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El proveedor no ha sido creado correctamente', () => {

    component.proveedorForm.value.cuit = '204521577744'
    component.proveedorForm.value.razonSocial = 'ProveedorPrueba'
    component.proveedorForm.value.direccion = 'Prueba 1234'
    component.proveedorForm.value.ciudad = 'Neverland'
    component.proveedorForm.value.provincia = 'Neverland'
    component.proveedorForm.value.pais = 'Neverland'
    component.proveedorForm.value.telefono = '+54 9 3462 556677'
    component.proveedorForm.value.email = 'prueba@gmail.com'

    component.enviar()
    expect(component.nuevoProveedor).toBeFalse();
  });
});
