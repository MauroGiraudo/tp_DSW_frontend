import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaEliminarComponent } from './mesa-eliminar.component';

describe('MesaEliminarComponent', () => {
  let component: MesaEliminarComponent;
  let fixture: ComponentFixture<MesaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
