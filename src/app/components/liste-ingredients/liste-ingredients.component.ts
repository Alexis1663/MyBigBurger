import { MatTableModule } from '@angular/material/table';
import { Ingredient } from '../../core/models/ingredient';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditIngredientDialogComponent } from '../edit-ingredient-dialog/edit-ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

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
export class ListeIngredientsComponent implements OnInit{
  // ingredients = INGREDIENTS;
  ingredients: Ingredient[] = [];
  private ingredientsSubscription!: Subscription;
  columnsToDisplay = ['id', 'name', 'description', 'actions'];
  ingredientForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly _ingredientService: IngredientService,
  ) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ingredientsSubscription = this._ingredientService.ingredients$.subscribe({
      next: (ingredients) => {
        this.ingredients = ingredients;
      },
      error: (error) => {
        console.dir(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

  onAddIngredient() {
    const newIngredient: Ingredient = {
      id: this.ingredients.length + 1,
      name: this.ingredientForm.value.name,
      description: this.ingredientForm.value.description
    };

    this._ingredientService.add(newIngredient).subscribe((addIngredient) => {
      if(addIngredient) {
        console.dir("Ingrédient ajouté avec succès !");
      } else {
        console.dir("Erreur lors de l'ajout de l'ingrédient !");
      }
    });

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
          console.dir(ingredient.id);
          this._ingredientService.update(ingredient.id, result).subscribe((updatedIngredient) => {
            this.ingredients[index] = updatedIngredient;
          });
        }
      }
    });
  }
}
