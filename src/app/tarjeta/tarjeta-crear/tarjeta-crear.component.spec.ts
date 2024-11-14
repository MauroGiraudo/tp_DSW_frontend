import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCrearComponent } from './tarjeta-crear.component';

describe('TarjetaCrearComponent', () => {
  let component: TarjetaCrearComponent;
  let fixture: ComponentFixture<TarjetaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
