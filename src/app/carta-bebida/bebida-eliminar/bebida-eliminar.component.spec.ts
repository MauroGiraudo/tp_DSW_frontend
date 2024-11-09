import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaEliminarComponent } from './bebida-eliminar.component';

describe('BebidaEliminarComponent', () => {
  let component: BebidaEliminarComponent;
  let fixture: ComponentFixture<BebidaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
