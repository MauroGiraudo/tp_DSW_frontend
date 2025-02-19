import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoModificarComponent } from './pedido-modificar.component';

describe('PedidoModificarComponent', () => {
  let component: PedidoModificarComponent;
  let fixture: ComponentFixture<PedidoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
