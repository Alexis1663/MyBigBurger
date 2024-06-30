import { MatTableModule } from '@angular/material/table';
import { INGREDIENTS } from '../../datas/ingredients.stub';
import { Ingredient } from '../../core/models/ingredient';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditIngredientDialogComponent } from '../edit-ingredient-dialog/edit-ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

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
    CommonModule
  ],
  templateUrl: './liste-ingredients.component.html',
  styleUrl: './liste-ingredients.component.scss'
})
export class ListeIngredientsComponent {
  ingredients = INGREDIENTS;
  columnsToDisplay = ['id', 'name', 'actions'];
  ingredientForm: FormGroup;
  isEditMode = false;
  editedIngredientIndex: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onAddIngredient() {
    const newIngredient: Ingredient = {
      id: this.ingredients.length + 1,
      name: this.ingredientForm.value.name
    };

    if (this.isEditMode && this.editedIngredientIndex !== null) {
      this.ingredients[this.editedIngredientIndex] = newIngredient;
      this.isEditMode = false;
      this.editedIngredientIndex = null;
    } else {
      this.ingredients.push(newIngredient);
      console.dir(this.ingredients);
    }
    this.ingredientForm.reset();
  }

  onEditIngredient(ingredient: Ingredient) {
    const dialogRef = this.dialog.open(EditIngredientDialogComponent, {
      width: '300px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.ingredients.findIndex(item => item.id === ingredient.id);
        if (index !== -1) {
          this.ingredients[index].name = result.name;
        }
      }
    });
  }
}
