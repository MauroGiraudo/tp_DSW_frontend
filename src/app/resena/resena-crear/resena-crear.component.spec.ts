import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaCrearComponent } from './resena-crear.component';

describe('ResenaCrearComponent', () => {
  let component: ResenaCrearComponent;
  let fixture: ComponentFixture<ResenaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResenaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
