import {Component, Input} from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgIf, SlicePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-recipe',
    standalone: true,
    imports: [
        MatCardHeader,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        SlicePipe,
        MatButton,
        NgIf
    ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

    @Input() name: string | undefined;
    @Input() description: string | undefined;
    @Input() id: number | undefined;
    @Input() image: string | undefined;

    public constructor(
        private readonly _router: Router
    ) {
    }

    public redirectToRecipeDetail(): void {
        this._router.navigate(['recette', this.id]).then();
    }
}
