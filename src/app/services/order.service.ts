import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RecipeModel } from "../core/models/recipe.model";
import {RecipeStatus} from "../dto/recipe-status";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private _recipeStatus: RecipeStatus[] = [];

    public get recipeOrder(): RecipeStatus[] {
        return this._recipeStatus;
    }

    constructor() {
        this.loadRecipeStatus();
    }

    private loadRecipeStatus(): void {
        const recipeStatus: string | null = localStorage.getItem('recipeStatus');
        if (recipeStatus) {
            this._recipeStatus = JSON.parse(recipeStatus) as RecipeStatus[];
        }
    }

    public getStatusRecipe(idRecipe: number): boolean {
        let recipeStatus: RecipeStatus | undefined = this._recipeStatus.find((recipeStatus: RecipeStatus): boolean => recipeStatus.recipe.id === idRecipe);
        return recipeStatus ? recipeStatus.status : false;
    }


    public changeStatusRecipe(recipe: RecipeModel): void {
        let recipeToUpdate: RecipeStatus | undefined = this._recipeStatus.find((recipeStatus: RecipeStatus): boolean => recipeStatus.recipe.id === recipe.id);
        if(recipeToUpdate) {
            recipeToUpdate.status = !recipeToUpdate.status;
        } else {
            this._recipeStatus.push({
                recipe: recipe,
                status: true
            });
        }
        this.save();
    }

    private save(): void {
        localStorage.setItem('recipeStatus', JSON.stringify(this._recipeStatus));
    }
}
