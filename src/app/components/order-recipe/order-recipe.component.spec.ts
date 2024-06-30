import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRecipeComponent } from './order-recipe.component';

describe('OrderRecipeComponent', () => {
  let component: OrderRecipeComponent;
  let fixture: ComponentFixture<OrderRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
