import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplatoCrearComponent } from './tipoplato-crear.component';

describe('TipoplatoCrearComponent', () => {
  let component: TipoplatoCrearComponent;
  let fixture: ComponentFixture<TipoplatoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoplatoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoplatoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
