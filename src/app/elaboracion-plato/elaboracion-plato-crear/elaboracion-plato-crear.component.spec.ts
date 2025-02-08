import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPlatoCrearComponent } from './elaboracion-plato-crear.component';

describe('ElaboracionPlatoCrearComponent', () => {
  let component: ElaboracionPlatoCrearComponent;
  let fixture: ComponentFixture<ElaboracionPlatoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaboracionPlatoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElaboracionPlatoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
