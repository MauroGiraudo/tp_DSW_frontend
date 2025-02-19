import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaComidaComponents } from './carta.component';

describe('CartaComponent', () => {
  let component: CartaComidaComponents;
  let fixture: ComponentFixture<CartaComidaComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaComidaComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaComidaComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
