import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplatoEliminarComponent } from './tipoplato-eliminar.component';

describe('TipoplatoEliminarComponent', () => {
  let component: TipoplatoEliminarComponent;
  let fixture: ComponentFixture<TipoplatoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoplatoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoplatoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
