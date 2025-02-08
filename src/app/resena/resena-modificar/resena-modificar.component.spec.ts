import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaModificarComponent } from './resena-modificar.component';

describe('ResenaModificarComponent', () => {
  let component: ResenaModificarComponent;
  let fixture: ComponentFixture<ResenaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
