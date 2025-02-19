import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPlatoListaComponent } from './elaboracion-plato-lista.component';

describe('ElaboracionPlatoListaComponent', () => {
  let component: ElaboracionPlatoListaComponent;
  let fixture: ComponentFixture<ElaboracionPlatoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaboracionPlatoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElaboracionPlatoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
