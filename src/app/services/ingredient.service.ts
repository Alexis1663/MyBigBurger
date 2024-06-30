import {inject, Injectable} from "@angular/core";
import {Ingredient} from "../core/models/ingredient";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class IngredientService {
    private http: HttpClient = inject(HttpClient);

    private _ingredients: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
    public ingredients$: Observable<Ingredient[]> = this._ingredients.asObservable();

    public constructor() {
        this.load();
    }

    public getIngredients(): Observable<Ingredient[]> {
        return this.ingredients$;
    }

    add(ingredient: Ingredient): Observable<Ingredient> {
        return this.http.post<Ingredient>('https://664ba07f35bbda10987d9f99.mockapi.io/api/ingredients', ingredient)
            .pipe(
                tap(newIngredient => {
                    const currentIngredients = this._ingredients.value.slice();
                    currentIngredients.push(newIngredient);
                    this._ingredients.next(currentIngredients);
                }),
            );
    }

    update(id: number, ingredient: Ingredient): Observable<Ingredient> {
        return this.http.patch<Ingredient>(`https://664ba07f35bbda10987d9f99.mockapi.io/api/ingredients/${id}`, ingredient)
            .pipe(
                tap(updatedIngredient => {
                    const updatedIngredients = this._ingredients.value.map(i => i.id === id ? updatedIngredient : i);
                    this._ingredients.next(updatedIngredients);
                })
            );
    }

    private load(): void {
        this.http.get<Ingredient[]>('https://664ba07f35bbda10987d9f99.mockapi.io/api/ingredients')
            .subscribe((ingredients: Ingredient[]) => {
                this._ingredients.next(ingredients);
            });
    }
}
