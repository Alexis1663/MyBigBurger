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
        MatButton
    ]
})
export class ListIngredientsComponent {

    displayedColumns: string[] = [
        'ingredient',
        'quantity'
    ];

    @Input() public ingredientRecipes: IngredientRecipe[] = [];

}
