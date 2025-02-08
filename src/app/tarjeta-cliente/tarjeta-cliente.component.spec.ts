import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaClienteComponent } from './tarjeta-cliente.component';

describe('TarjetaClienteComponent', () => {
  let component: TarjetaClienteComponent;
  let fixture: ComponentFixture<TarjetaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
