import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { OrderRecipeComponent } from '../order-recipe/order-recipe.component';
import { RecipeModel } from '../../core/models/recipe.model';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule, 
    MatButtonModule,
    OrderRecipeComponent,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  orderedRecipes: RecipeModel[] = [];
  displayedColumns: string[] = ['name', 'description', 'ingredients'];

  constructor(
    private _router: Router,
    private readonly orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderedRecipes = this.orderService.getOrderedRecipes();
    console.dir(this.orderedRecipes);
  }

  redirectToListeRecettes() {
    this._router.navigate(['/liste-recettes']);
  }
}
