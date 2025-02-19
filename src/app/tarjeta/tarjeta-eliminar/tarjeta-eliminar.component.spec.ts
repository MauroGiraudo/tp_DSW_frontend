import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaEliminarComponent } from './tarjeta-eliminar.component';

describe('TarjetaEliminarComponent', () => {
  let component: TarjetaEliminarComponent;
  let fixture: ComponentFixture<TarjetaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
