import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteCrearComponent } from './ingrediente-crear.component';

describe('IngredienteCrearComponent', () => {
  let component: IngredienteCrearComponent;
  let fixture: ComponentFixture<IngredienteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredienteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
