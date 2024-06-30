import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
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
import {identity, Observable} from "rxjs";
import {Ingredient} from "../../core/models/ingredient";
import {IngredientService} from "../../services/ingredient.service";
import {DisplayIngredient} from "../../dto/display-ingredient";

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
export class ListIngredientsComponent{

    public displayedColumns: string[] = [
        'ingredient',
        'quantity',
        'delete'
    ];

    @Input() public ingredientRecipes: DisplayIngredient[] = [];
    @Output() public ingredientRecipesChange: EventEmitter<DisplayIngredient[]> = new EventEmitter<DisplayIngredient[]>();

    public removeIngredient(idIngredient: number): void {
        this.ingredientRecipes = this.ingredientRecipes.filter((displayIngredient: DisplayIngredient): boolean => displayIngredient.ingredient.id !== idIngredient);
        this.ingredientRecipesChange.emit(this.ingredientRecipes);
    }
}
