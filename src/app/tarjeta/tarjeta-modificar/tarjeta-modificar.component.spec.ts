import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaModificarComponent } from './tarjeta-modificar.component';

describe('TarjetaModificarComponent', () => {
  let component: TarjetaModificarComponent;
  let fixture: ComponentFixture<TarjetaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
