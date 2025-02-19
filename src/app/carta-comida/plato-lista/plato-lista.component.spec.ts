import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoListaComponent } from './plato-lista.component';

describe('PlatoListaComponent', () => {
  let component: PlatoListaComponent;
  let fixture: ComponentFixture<PlatoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
