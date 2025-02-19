import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplatoModificarComponent } from './tipoplato-modificar.component';

describe('TipoplatoModificarComponent', () => {
  let component: TipoplatoModificarComponent;
  let fixture: ComponentFixture<TipoplatoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoplatoModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoplatoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
