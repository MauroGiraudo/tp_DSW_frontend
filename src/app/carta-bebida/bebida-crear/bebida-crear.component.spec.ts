import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaCrearComponent } from './bebida-crear.component';

describe('BebidaCrearComponent', () => {
  let component: BebidaCrearComponent;
  let fixture: ComponentFixture<BebidaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BebidaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
