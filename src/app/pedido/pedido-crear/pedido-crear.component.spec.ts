import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCrearComponent } from './pedido-crear.component';

describe('PedidoCrearComponent', () => {
  let component: PedidoCrearComponent;
  let fixture: ComponentFixture<PedidoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
