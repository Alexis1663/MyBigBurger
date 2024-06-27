import {Injectable} from "@angular/core";
import exp from "constants";
import {FormGroup} from "@angular/forms";
import {RecipeModel} from "../../core/models/recipe.model";

@Injectable({
    providedIn: 'root',
})
export class RecipeServices {

    public _recipes: RecipeModel[] = [];

    public get recipes(): RecipeModel[] {
        return this._recipes;
    }

    public constructor() {
        this.load();
    }

    public addRecipe(recipe: RecipeModel): void {
        this._recipes.push(recipe);
        this.save();
    }

    private save(): void {
        localStorage.setItem('recipes', JSON.stringify(this._recipes));
    }

    private load(): void {
        const recipes: string | null = localStorage.getItem('recipes');
        if (recipes) {
            this._recipes = JSON.parse(recipes) as RecipeModel[];
        }
    }

}
