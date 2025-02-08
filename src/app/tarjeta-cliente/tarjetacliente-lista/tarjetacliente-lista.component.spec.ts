import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaclienteListaComponent } from './tarjetacliente-lista.component';

describe('TarjetaclienteListaComponent', () => {
  let component: TarjetaclienteListaComponent;
  let fixture: ComponentFixture<TarjetaclienteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaclienteListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaclienteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
