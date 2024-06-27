import {Component, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {FormRecipeDialogComponent} from "../form-recipe-dialog/form-recipe-dialog.component";
import {RecipeServices} from "../../services/recipe.services";
import {RecipeModel} from "../../core/models/recipe.model";
import {RecipeComponent} from "../recipe/recipe.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-liste-recettes',
  standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule, RecipeComponent, NgForOf],
  templateUrl: './liste-recettes.component.html',
  styleUrl: './liste-recettes.component.scss'
})
export class ListeRecettesComponent {

    private readonly _dialog: MatDialog = inject(MatDialog);

    public get recipes(): RecipeModel[] {
        return this._recipeService.recipes;
    }

    public constructor(
        private readonly _recipeService: RecipeServices,
    ) {}

    public openDialog(): void {
        this._dialog.open(FormRecipeDialogComponent, {
            width: '80%',
            height: 'auto',
        });
    }

}
