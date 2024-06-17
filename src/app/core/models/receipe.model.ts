import {ReceipeIngredientModel} from "./receipe-ingredient";

export class ReceipeModel {
    private readonly _name: string | undefined;
    private readonly _description: string | undefined;
    private readonly _ingredients: ReceipeIngredientModel[] | undefined;
    private readonly _image: string | undefined;

    public constructor(name: string, description: string, ingredients: ReceipeIngredientModel[], image: string) {
        this._name = name;
        this._description = description;
        this._ingredients = ingredients;
        this._image = image;
    }

    public get name(): string | undefined {
        return this._name;
    }

    public get description(): string | undefined {
        return this._description;
    }

    public get ingredients(): ReceipeIngredientModel[] | undefined {
        return this._ingredients;
    }

    public get image(): string | undefined {
        return this._image;
    }
}
