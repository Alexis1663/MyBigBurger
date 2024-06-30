import {MatTableModule} from '@angular/material/table';
import {Ingredient} from '../../core/models/ingredient';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {EditIngredientDialogComponent} from '../edit-ingredient-dialog/edit-ingredient-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientService} from '../../services/ingredient.service';
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-liste-ingredients',
    standalone: true,
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatError,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule
    ],
    templateUrl: './liste-ingredients.component.html',
    styleUrl: './liste-ingredients.component.scss'
})
export class ListeIngredientsComponent implements OnInit, OnDestroy {

    public ingredients: Ingredient[] = [];

    public columnsToDisplay = ['id', 'name', 'description', 'actions'];

    public ingredientForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    private _ingredientsSubscription!: Subscription;

    constructor(
        private readonly _dialog: MatDialog,
        private readonly _ingredientService: IngredientService,
    ) {
    }

    public ngOnInit(): void {
        this.onIngredientSubscribe();
    }

    public ngOnDestroy(): void {
        this._ingredientsSubscription.unsubscribe();
    }

    public onAddIngredient(): void {
        const newIngredient: Ingredient = {
            id: this.ingredients.length + 1,
            name: this.ingredientForm.value.name,
            description: this.ingredientForm.value.description
        };
        this._ingredientService.add(newIngredient).subscribe();
        this.ingredientForm.reset();
    }

    public onEditIngredient(ingredient: Ingredient): void {
        const dialogRef: MatDialogRef<EditIngredientDialogComponent> = this._dialog.open(EditIngredientDialogComponent, {
            width: '300px',
            data: ingredient
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = this.ingredients.findIndex(item => item.id === ingredient.id);
                if (index !== -1) {
                    console.dir(ingredient.id);
                    this._ingredientService.update(ingredient.id, result).subscribe((updatedIngredient) => {
                        this.ingredients[index] = updatedIngredient;
                    });
                }
            }
        });
    }

    private onIngredientSubscribe(): void {
        this._ingredientsSubscription = this._ingredientService.ingredients$.subscribe({
            next: (ingredients) => {
                this.ingredients = ingredients;
            },
            error: (error) => {
                console.dir(error);
            }
        });
    }
}
