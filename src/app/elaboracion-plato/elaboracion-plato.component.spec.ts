import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboracionPlatoComponent } from './elaboracion-plato.component';

describe('ElaboracionPlatoComponent', () => {
  let component: ElaboracionPlatoComponent;
  let fixture: ComponentFixture<ElaboracionPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElaboracionPlatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElaboracionPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
