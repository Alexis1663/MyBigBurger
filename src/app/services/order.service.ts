import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RecipeModel } from "../core/models/recipe.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderedRecipesSubject: BehaviorSubject<RecipeModel[]> = new BehaviorSubject<RecipeModel[]>([]);
    public orderedRecipes$: Observable<RecipeModel[]> = this.orderedRecipesSubject.asObservable();

    constructor() { }

    public addOrderedRecipe(recipe: RecipeModel): void {
        const currentOrders = this.orderedRecipesSubject.value;
        const updatedOrders = [...currentOrders, recipe];
        this.orderedRecipesSubject.next(updatedOrders);
    }

    public getOrderedRecipes(): RecipeModel[] {
        return this.orderedRecipesSubject.value;
    }
}