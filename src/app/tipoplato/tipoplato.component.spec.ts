import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplatoComponent } from './tipoplato.component';

describe('TipoplatoComponent', () => {
  let component: TipoplatoComponent;
  let fixture: ComponentFixture<TipoplatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoplatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoplatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
