import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPlatoEliminarComponent } from './elaboracion-plato-eliminar.component';

describe('ElaboracionPlatoEliminarComponent', () => {
  let component: ElaboracionPlatoEliminarComponent;
  let fixture: ComponentFixture<ElaboracionPlatoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaboracionPlatoEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElaboracionPlatoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
