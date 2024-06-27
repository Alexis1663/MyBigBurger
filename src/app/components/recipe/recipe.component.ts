import {Component, Input} from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe',
  standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatIcon,
        MatCardContent,
        SlicePipe,
        NgIf,
        MatCardTitle,
        MatMiniFabButton,
        NgForOf,
        MatCardActions,
        MatButton,
        MatFabButton
    ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

    @Input() name: string | undefined;
    @Input() description: string | undefined;
    @Input() id: number | undefined;

    public constructor(
        private readonly _router: Router
    ) {
    }

    public redirectToRecipeDetail(): void {
        this._router.navigate(['recette', this.id]).then();
    }
}
