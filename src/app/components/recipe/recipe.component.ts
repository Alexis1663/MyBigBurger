import {Component, Input} from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgIf, SlicePipe} from "@angular/common";
import {Router} from "@angular/router";
import { RecipeModel } from '../../core/models/recipe.model';
import { OrderService } from '../../services/order.service';
import { Ingredient } from '../../core/models/ingredient';

@Component({
    selector: 'app-recipe',
    standalone: true,
    imports: [
        MatCardHeader,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        SlicePipe,
        MatButton,
        NgIf
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

    @Input() name: string | undefined;
    @Input() description: string | undefined;
    @Input() id: number | undefined;
    @Input() image: string | undefined;
    @Input() ingredients: Ingredient[] | undefined;

    public constructor(
        private readonly _router: Router,
        private readonly orderService: OrderService
    ) {
    }

    public orderRecipe(): void {
        const recipe: RecipeModel = {
          id: this.id || 0,
          name: this.name,
          description: this.description,
          image: this.image,
          ingredients: this.ingredients
        };
    
        this.orderService.addOrderedRecipe(recipe);
        console.log('Recipe ordered:', recipe);
      }

    public redirectToRecipeDetail(): void {
        this._router.navigate(['recette', this.id]).then();
    }
}
