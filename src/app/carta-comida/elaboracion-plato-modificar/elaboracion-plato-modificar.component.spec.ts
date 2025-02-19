import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPlatoModificarComponent } from './elaboracion-plato-modificar.component';

describe('ElaboracionPlatoModificarComponent', () => {
  let component: ElaboracionPlatoModificarComponent;
  let fixture: ComponentFixture<ElaboracionPlatoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaboracionPlatoModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElaboracionPlatoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
