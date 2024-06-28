import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
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
        NgIf
    ],
    templateUrl: './form-recipe-dialog.component.html',
    styleUrl: './form-recipe-dialog.component.scss'
})
export class FormRecipeDialogComponent {
    private readonly _dialogRef: MatDialogRef<FormRecipeDialogComponent> = inject(MatDialogRef<FormRecipeDialogComponent>);

    public get ingredientRecipes(): IngredientRecipe[] {
        return this.formRecipe.controls['ingredients'].value;
    }

    public formRecipe: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        image: new FormControl(null, Validators.required),
        ingredients: new FormControl([], Validators.required),
    });

    public constructor(
        private readonly _recipeServices: RecipeServices,
    ) {
    }


    public addIngredient(ingredientRecipe: IngredientRecipe): void {
        this.formRecipe.controls['ingredients'].setValue([...this.formRecipe.controls['ingredients'].value, ingredientRecipe]);
    }

    public fileUpload(event: Event): void {
        if(!event.target) return;
        let input: HTMLInputElement = event.target as HTMLInputElement;
        if(input) {
            let fileList: FileList | null = input.files;
            if (fileList) {
                const file: File = fileList[0];
                const reader = new FileReader();
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
            let ingredients: Ingredient[] = this.formRecipe.controls['ingredients'].value.map((ingredientRecipe: IngredientRecipe) => {
                return ingredientRecipe.ingredient;
            });
            this.formRecipe.controls['ingredients'].setValue(ingredients);
            this._recipeServices.addRecipe(this.formRecipe.value);
            this.formRecipe.reset();
            this._dialogRef.close();
        }
    }

}
