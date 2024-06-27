import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../../core/models/recipe.model";
import {NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {RecipeServices} from "../../services/recipe.services";

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    imports: [
        NgIf,
        SlicePipe
    ],
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {

    public recipe: RecipeModel | undefined;

    public constructor(
        private readonly _route: ActivatedRoute,
        private readonly _recipeService: RecipeServices
    ) {
    }

    public ngOnInit(): void {
        this.initRecipe();
    }

    private initRecipe(): void {
        let idRecipe: string = this._route.snapshot.params['id'];
        if (idRecipe) {
            this.recipe = this._recipeService.getRecipeById(parseInt(idRecipe));
        }
    }
}
