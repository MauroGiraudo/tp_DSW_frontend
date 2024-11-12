import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoCrearComponent } from './plato-crear.component';

describe('PlatoCrearComponent', () => {
  let component: PlatoCrearComponent;
  let fixture: ComponentFixture<PlatoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
