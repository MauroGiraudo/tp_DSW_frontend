import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorCrearComponent } from './proveedor-crear.component';

describe('ProveedorCrearComponent', () => {
  let component: ProveedorCrearComponent;
  let fixture: ComponentFixture<ProveedorCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProveedorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
