import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaModificarComponent } from './bebida-modificar.component';

describe('BebidaModificarComponent', () => {
  let component: BebidaModificarComponent;
  let fixture: ComponentFixture<BebidaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
