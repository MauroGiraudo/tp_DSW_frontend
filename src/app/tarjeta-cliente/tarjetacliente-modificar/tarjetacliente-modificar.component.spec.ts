import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaclienteModificarComponent } from './tarjetacliente-modificar.component';

describe('TarjetaclienteModificarComponent', () => {
  let component: TarjetaclienteModificarComponent;
  let fixture: ComponentFixture<TarjetaclienteModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaclienteModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaclienteModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
