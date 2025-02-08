import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaEliminarComponent } from './resena-eliminar.component';

describe('ResenaEliminarComponent', () => {
  let component: ResenaEliminarComponent;
  let fixture: ComponentFixture<ResenaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
