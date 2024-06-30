import {RecipeModel} from "../core/models/recipe.model";

export interface RecipeStatus {
    recipe: RecipeModel;
    status: boolean;
}
