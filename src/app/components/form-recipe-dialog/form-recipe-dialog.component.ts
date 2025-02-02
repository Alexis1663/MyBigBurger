import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ListIngredientsComponent} from "../list-ingredients/list-ingredients.components";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormIngredientComponent} from "../form-ingredient/form-ingredient.component";
import {IngredientRecipe} from "../../core/models/ingredient-recipe";
import {Ingredient} from "../../core/models/ingredient";
import {RecipeServices} from "../../services/recipe.services";
import {DisplayIngredient} from "../../dto/display-ingredient";

@Component({
    selector: 'app-form-recipe-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogContent,
        MatLabel,
        MatFormField,
        MatDialogActions,
        MatDialogClose,
        MatInputModule,
        MatButtonModule,
        ListIngredientsComponent,
        MatSelect,
        MatOption,
        NgForOf,
        FormIngredientComponent,
        NgIf,
        MatDialogTitle
    ],
    templateUrl: './form-recipe-dialog.component.html',
    styleUrl: './form-recipe-dialog.component.scss'
})
export class FormRecipeDialogComponent {
    public formRecipe: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
        ingredients: new FormControl([], Validators.required),
    });

    private readonly _dialogRef: MatDialogRef<FormRecipeDialogComponent> = inject(MatDialogRef<FormRecipeDialogComponent>);

    public get ingredientRecipes(): DisplayIngredient[] {
        return this.formRecipe.controls['ingredients'].value;
    }

    public set ingredientRecipes(ingredientRecipes: DisplayIngredient[]) {
        this.formRecipe.controls['ingredients'].setValue(ingredientRecipes);
    }

    public constructor(
        private readonly _recipeServices: RecipeServices
    ) {
    }

    public addIngredient(ingredientRecipe: DisplayIngredient): void {
        this.formRecipe.controls['ingredients'].setValue([...this.formRecipe.controls['ingredients'].value, ingredientRecipe]);
    }

    public fileUpload(event: Event): void {
        if (!event.target) return;
        let input: HTMLInputElement = event.target as HTMLInputElement;
        if (input) {
            let fileList: FileList | null = input.files;
            if (fileList) {
                const file: File = fileList[0];
                const reader: FileReader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result as string;
                    this.formRecipe.controls['image'].setValue(base64String);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    public addRecipe(): void {
        if (this.formRecipe.valid) {
            this._recipeServices.addRecipe(this.formRecipe.value);
            this.formRecipe.reset();
            this._dialogRef.close();
        }
    }
}
