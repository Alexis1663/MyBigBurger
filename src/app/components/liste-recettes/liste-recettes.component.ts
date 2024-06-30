import {ChangeDetectorRef, Component, ViewChild, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {FormRecipeDialogComponent} from "../form-recipe-dialog/form-recipe-dialog.component";
import {RecipeServices} from "../../services/recipe.services";
import {RecipeModel} from "../../core/models/recipe.model";
import {RecipeComponent} from "../recipe/recipe.component";
import {NgForOf} from "@angular/common";
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-liste-recettes',
  standalone: true,
    imports: [
        MatCardModule, 
        MatIconModule, 
        MatButtonModule, 
        RecipeComponent, 
        NgForOf,
        MatPaginatorModule
    ],
  templateUrl: './liste-recettes.component.html',
  styleUrl: './liste-recettes.component.scss'
})
export class ListeRecettesComponent {

    private readonly _dialog: MatDialog = inject(MatDialog);

    paginatedRecipes: RecipeModel[] = [];
    pageSize: number = 3;
    pageIndex: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    public get recipes(): RecipeModel[] {
        return this._recipeService.recipes;
    }

    public constructor(
        private readonly _recipeService: RecipeServices,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this._recipeService.load();
    }

    ngAfterViewInit() {
        this.updatePaginatedRecipes();
        this.cdr.detectChanges();
        this.paginator.page.subscribe(() => this.updatePaginatedRecipes());
    }

    updatePaginatedRecipes(event?: PageEvent) {
        // On détermine si un event est fourni et on utilise ses propriétés pageIndex et pageSize
        const pageIndex = event ? event.pageIndex : this.paginator.pageIndex;
        const pageSize = event ? event.pageSize : this.paginator.pageSize;
    
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
    
        // On utilise slice pour obtenir les recettes paginées
        this.paginatedRecipes = this._recipeService.recipes.slice(startIndex, endIndex);
    }

    public openDialog(): void {
        const dialogRef = this._dialog.open(FormRecipeDialogComponent, {
            width: '80%',
            height: 'auto',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this._recipeService.recipes;
              setTimeout(() => {
                this.paginator.lastPage();
              });
            }
        });
    }

}
