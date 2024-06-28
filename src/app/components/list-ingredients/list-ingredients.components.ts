import {Component, Input} from "@angular/core";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientRecipe} from "../../core/models/ingredient-recipe";
import {MatIcon} from "@angular/material/icon";
import {RecipeServices} from "../../services/recipe.services";

@Component({
    selector: "app-list-ingredients",
    templateUrl: "./list-ingredients.components.html",
    styleUrl: "./list-ingredients.components.scss",
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderRow,
        MatRow,
        MatButton,
        MatIcon
    ]
})
export class ListIngredientsComponent {

    displayedColumns: string[] = [
        'ingredient',
        'quantity',
        'delete'
    ];

    @Input() public ingredientRecipes: IngredientRecipe[] = [];

    public constructor(
        private readonly _recipeService: RecipeServices
    ) {
    }

    public removeIngredient(ingredient: IngredientRecipe): void {

    }

}
