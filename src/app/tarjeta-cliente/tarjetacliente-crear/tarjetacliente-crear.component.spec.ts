import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaclienteCrearComponent } from './tarjetacliente-crear.component';

describe('TarjetaclienteCrearComponent', () => {
  let component: TarjetaclienteCrearComponent;
  let fixture: ComponentFixture<TarjetaclienteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaclienteCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaclienteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
