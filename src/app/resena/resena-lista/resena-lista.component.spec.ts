import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaListaComponent } from './resena-lista.component';

describe('ResenaListaComponent', () => {
  let component: ResenaListaComponent;
  let fixture: ComponentFixture<ResenaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
