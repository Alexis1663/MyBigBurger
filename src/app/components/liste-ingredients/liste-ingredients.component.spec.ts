import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeIngredientsComponent } from './liste-ingredients.component';

describe('ListeIngredientsComponent', () => {
  let component: ListeIngredientsComponent;
  let fixture: ComponentFixture<ListeIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
