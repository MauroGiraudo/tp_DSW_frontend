import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaclienteEliminarComponent } from './tarjetacliente-eliminar.component';

describe('TarjetaclienteEliminarComponent', () => {
  let component: TarjetaclienteEliminarComponent;
  let fixture: ComponentFixture<TarjetaclienteEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaclienteEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaclienteEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
