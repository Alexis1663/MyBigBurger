import {Ingredient} from "./ingredient";

export interface RecipeModel {
    id: number;
    name: string | undefined;
    description: string | undefined;
    ingredients: Ingredient[] | undefined;
    image: string | undefined;
}
