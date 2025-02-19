import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaCrearComponent } from './mesa-crear.component';

describe('MesaCrearComponent', () => {
  let component: MesaCrearComponent;
  let fixture: ComponentFixture<MesaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
