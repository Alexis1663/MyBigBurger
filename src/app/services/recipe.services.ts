import {Injectable} from "@angular/core";
import {RecipeModel} from "../core/models/recipe.model";
import { BehaviorSubject, Observable } from "rxjs";

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
        this.load();
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
        this._recipes.push(recipe);
        this._recipesSubject.next(this._recipes);
        this.save();
    }

    private save(): void {
        localStorage.setItem('recipes', JSON.stringify(this._recipes));
    }

    public load(): void {
        const recipes: string | null = localStorage.getItem('recipes');
        if (recipes) {
            this._recipes = JSON.parse(recipes) as RecipeModel[];
        }
        this._recipesSubject.next(this._recipes);
    }

    public getRecipeById(id: number): RecipeModel | undefined {
        return this._recipes.find(recipe => recipe.id === id);
    }

}
