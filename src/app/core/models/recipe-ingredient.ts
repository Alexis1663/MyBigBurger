import {IngredientModel} from "./ingredient.model";

export class ReceipeIngredientModel {
    private readonly _id: number | undefined;
    private readonly _quantity: number | undefined;
    private readonly _ingredient: IngredientModel | undefined;

    public constructor(id: number, quantity: number, ingredient: IngredientModel) {
        this._id = id;
        this._quantity = quantity;
        this._ingredient = ingredient;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get quantity(): number | undefined {
        return this._quantity;
    }

    public get ingredient(): IngredientModel | undefined {
        return this._ingredient;
    }
}
