import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteEliminarComponent } from './ingrediente-eliminar.component';

describe('IngredienteEliminarComponent', () => {
  let component: IngredienteEliminarComponent;
  let fixture: ComponentFixture<IngredienteEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredienteEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
