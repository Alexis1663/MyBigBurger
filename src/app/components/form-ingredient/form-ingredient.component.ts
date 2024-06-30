import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ListIngredientsComponent} from "../list-ingredients/list-ingredients.components";
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {INGREDIENTS} from "../../datas/ingredients.stub";
import {MatIcon} from "@angular/material/icon";
import {IngredientRecipe} from "../../core/models/ingredient-recipe";
import {Ingredient} from "../../core/models/ingredient";
import { IngredientService } from '../../services/ingredient.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form-ingredient',
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
        MatIcon,
        NgIf,
        CommonModule
    ],
    templateUrl: './form-ingredient.component.html',
    styleUrl: './form-ingredient.component.scss'
})
export class FormIngredientComponent {

    @Output() public onAddIngredient: EventEmitter<IngredientRecipe> = new EventEmitter<IngredientRecipe>();
    public choiceIngredients$!: Observable<Ingredient[]>;

    constructor(
        private readonly _ingredientService: IngredientService
    ) {
    }

    public get choiceIngredients(): Ingredient[] {
        return INGREDIENTS;
    }

    ngOnInit(): void {
        this.choiceIngredients$ = this._ingredientService.ingredients$;
    }

    public formIngredient: FormGroup = new FormGroup({
        ingredient: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[0-9]+$/)
        ]),
    });

    public addIngredient(): void {
        if(this.formIngredient.valid) {
            this.onAddIngredient.emit(this.formIngredient.value);
            this.formIngredient.reset();
        } else {
            this.formIngredient.markAllAsTouched();
        }
    }
}
