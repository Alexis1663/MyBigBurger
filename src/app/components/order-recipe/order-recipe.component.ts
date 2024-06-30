import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RecipeComponent } from '../recipe/recipe.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-recipe',
  standalone: true,
  imports: [
    MatCardModule,
    RecipeComponent,
    CommonModule
  ],
  templateUrl: './order-recipe.component.html',
  styleUrl: './order-recipe.component.scss'
})
export class OrderRecipeComponent {
  
}
