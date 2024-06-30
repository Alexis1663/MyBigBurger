import {Component, EventEmitter, Input, Output} from "@angular/core";
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
import {identity} from "rxjs";


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

    public displayedColumns: string[] = [
        'ingredient',
        'quantity',
        'delete'
    ];

    @Input() public ingredientRecipes: IngredientRecipe[] = [];
    @Output() public ingredientRecipesChange: EventEmitter<IngredientRecipe[]> = new EventEmitter<IngredientRecipe[]>();

    public removeIngredient(idIngredient: number): void {
        this.ingredientRecipes = this.ingredientRecipes.filter((i: IngredientRecipe): boolean => i.id !== idIngredient);
        this.ingredientRecipesChange.emit(this.ingredientRecipes);
    }

}
