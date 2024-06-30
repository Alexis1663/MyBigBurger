import {Injectable} from "@angular/core";
import {RecipeModel} from "../core/models/recipe.model";
import { BehaviorSubject, Observable } from "rxjs";
import {Ingredient} from "../core/models/ingredient";
import {IngredientRecipe} from "../core/models/ingredient-recipe";
import {DisplayIngredient} from "../dto/display-ingredient";
import {RecipeStatus} from "../dto/recipe-status";

@Injectable({
    providedIn: 'root',
})
export class RecipeServices {

    public _recipes: RecipeModel[] = [];
    private _recipesSubject: BehaviorSubject<RecipeModel[]> = new BehaviorSubject<RecipeModel[]>([]);

    public get recipes(): RecipeModel[] {
        return this._recipes;
    }

    public constructor() {
        this.loadRecipe();
    }

    public get recipes$(): Observable<RecipeModel[]> {
        return this._recipesSubject.asObservable();
    }

    public addRecipe(recipe: RecipeModel): void {
        if(this._recipes.length > 0) {
            let idMax: number = Math.max(...this._recipes.map(recipe => recipe.id));
            recipe.id = idMax + 1;
        }else {
            recipe.id = 1;
        }
        this.saveIngredientRecipe(recipe);
        this.formatIngredient(recipe);
        this._recipes.push(recipe);
        this._recipesSubject.next(this._recipes);
        this.save();
    }

    private saveIngredientRecipe(recipe: RecipeModel): void {
        let displayIngredients: DisplayIngredient[] = recipe.ingredients as unknown as DisplayIngredient[];
        displayIngredients.forEach((ingredient: DisplayIngredient): Object => {
            return {
                idRecipe: recipe.id,
                idIngredient: ingredient.ingredient.id,
                quantity: ingredient.quantity
            };
        });
        localStorage.setItem('ingredientRecipes', JSON.stringify(displayIngredients));
    }

    private formatIngredient(recipe: RecipeModel): RecipeModel {
        let displayIngredients: DisplayIngredient[] = recipe.ingredients as unknown as DisplayIngredient[];
        displayIngredients.forEach((ingredient: DisplayIngredient) => {
            return ingredient;
        });
        recipe.ingredients = displayIngredients as unknown as Ingredient[];

        return recipe;
    }

    private save(): void {
        localStorage.setItem('recipes', JSON.stringify(this._recipes));
    }

    public loadRecipe(): void {
        const recipes: string | null = localStorage.getItem('recipes');
        if (recipes) {
            this._recipes = JSON.parse(recipes) as RecipeModel[];
        }
        this._recipesSubject.next(this._recipes);
    }



    public getRecipeById(id: number): RecipeModel | undefined {
        return this._recipes.find((recipe: RecipeModel) => recipe.id === id);
    }



}
