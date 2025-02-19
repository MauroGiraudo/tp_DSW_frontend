import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoEliminarComponent } from './plato-eliminar.component';

describe('PlatoEliminarComponent', () => {
  let component: PlatoEliminarComponent;
  let fixture: ComponentFixture<PlatoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
