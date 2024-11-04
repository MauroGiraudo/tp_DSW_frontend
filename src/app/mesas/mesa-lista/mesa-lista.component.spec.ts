import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesaListaComponent } from './mesa-lista.component.js';
import { MesaService } from '../../service/mesa.service.js';
import { of, throwError } from 'rxjs';
import { ResponseMesas } from '../../models/mesa.models.js';

describe('MesaListaComponent', () => {
  let component: MesaListaComponent;
  let fixture: ComponentFixture<MesaListaComponent>;
  let mesaService: jasmine.SpyObj<MesaService>;

  beforeEach(async () => {
    const mesaServiceSpy = jasmine.createSpyObj('MesaService', ['getMesas', 'actualizarEstadoMesa']);

    await TestBed.configureTestingModule({
      declarations: [MesaListaComponent],
      providers: [
        { provide: MesaService, useValue: mesaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MesaListaComponent);
    component = fixture.componentInstance;
    mesaService = TestBed.inject(MesaService) as jasmine.SpyObj<MesaService>;
  });

  it('should fetch mesas on init', () => {
    const mesasMock: ResponseMesas = { 
      message: "Mesas obtenidas correctamente", // Agrega la propiedad message
      data: [{ nro_mesa: 1, estado: 'disponible', codigo: '1', cant_personas_max: 4 }] 
    };
    
    spyOn(mesaService, 'getMesas').and.returnValue(of(mesasMock));

    component.ngOnInit();
    expect(component.mesas.length).toBe(1);
    expect(component.mesas[0].estado).toBe('disponible');
  });

  it('should handle error when fetching mesas', () => {
    const errorResponse: ResponseMesas = {
      message: 'Error al obtener las mesas',
      data: []
    };
    
    spyOn(mesaService, 'getMesas').and.returnValue(throwError(() => errorResponse));

    component.getMesas();
    
    expect(component.mesas.length).toBe(0);
    // Aquí podrías también verificar si se llamaron las alertas o si se registró el error
  });
});

