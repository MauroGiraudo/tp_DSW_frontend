import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoplatoListaComponent } from './tipoplato-lista.component';

describe('TipoplatoListaComponent', () => {
  let component: TipoplatoListaComponent;
  let fixture: ComponentFixture<TipoplatoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoplatoListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoplatoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
