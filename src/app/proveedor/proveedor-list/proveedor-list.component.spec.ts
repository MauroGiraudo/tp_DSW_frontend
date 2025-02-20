import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProveedorListComponent } from './proveedor-list.component';

describe('ProveedorListComponent', () => {
  let component: ProveedorListComponent;
  let fixture: ComponentFixture<ProveedorListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedorListComponent],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('El listado de proveedores se obtiene correctamente', () => {


    expect(component).toBeTruthy();
  });

  //AVERIGUAR CÓMO LOGRAR QUE PRIMERO SE ASIGNEN LOS PROVEEDORES PROVENIENTES DEL BACK A LA VARIABLE "proveedores" PARA LUEGO
  // TESTEAR SI FUERON RECUPERADOS O NO
});
