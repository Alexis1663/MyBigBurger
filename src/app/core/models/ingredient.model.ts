export class IngredientModel {
    private readonly _id: number | undefined;
    private readonly _name: string | undefined;

    public constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get name(): string | undefined {
        return this._name;
    }
}
