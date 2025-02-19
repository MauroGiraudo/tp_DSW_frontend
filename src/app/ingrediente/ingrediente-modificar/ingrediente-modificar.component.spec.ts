import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteModificarComponent } from './ingrediente-modificar.component';

describe('IngredienteModificarComponent', () => {
  let component: IngredienteModificarComponent;
  let fixture: ComponentFixture<IngredienteModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredienteModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
