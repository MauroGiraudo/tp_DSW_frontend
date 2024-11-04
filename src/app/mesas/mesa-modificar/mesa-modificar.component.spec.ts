import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaModificarComponent } from './mesa-modificar.component';

describe('MesaModificarComponent', () => {
  let component: MesaModificarComponent;
  let fixture: ComponentFixture<MesaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
