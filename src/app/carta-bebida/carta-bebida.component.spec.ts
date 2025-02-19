import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaBebidaComponent } from './carta-bebida.component';

describe('CartaBebidaComponent', () => {
  let component: CartaBebidaComponent;
  let fixture: ComponentFixture<CartaBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
