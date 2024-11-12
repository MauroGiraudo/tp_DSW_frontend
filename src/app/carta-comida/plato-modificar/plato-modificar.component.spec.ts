import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoModificarComponent } from './plato-modificar.component';

describe('PlatoModificarComponent', () => {
  let component: PlatoModificarComponent;
  let fixture: ComponentFixture<PlatoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
