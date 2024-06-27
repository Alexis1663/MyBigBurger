import {Ingredient} from "./ingredient";

export interface RecipeModel {
    name: string | undefined;
    description: string | undefined;
    ingredients: Ingredient[] | undefined;
    image: string | undefined;
}
