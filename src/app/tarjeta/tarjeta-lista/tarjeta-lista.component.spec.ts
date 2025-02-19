import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaListaComponent } from './tarjeta-lista.component';

describe('TarjetaListaComponent', () => {
  let component: TarjetaListaComponent;
  let fixture: ComponentFixture<TarjetaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
