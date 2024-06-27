import {Injectable} from "@angular/core";
import {RecipeModel} from "../core/models/recipe.model";

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
        if(this._recipes.length > 0) {
            let idMax: number = Math.max(...this._recipes.map(recipe => recipe.id));
            recipe.id = idMax + 1;
        }else {
            recipe.id = 1;
        }
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

    public getRecipeById(id: number): RecipeModel | undefined {
        return this._recipes.find(recipe => recipe.id === id);
    }

}
