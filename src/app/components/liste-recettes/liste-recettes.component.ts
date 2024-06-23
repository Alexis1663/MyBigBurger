import {Component, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {FormRecipeDialogComponent} from "../form-recipe-dialog/form-recipe-dialog.component";

@Component({
  selector: 'app-liste-recettes',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './liste-recettes.component.html',
  styleUrl: './liste-recettes.component.scss'
})
export class ListeRecettesComponent {

    readonly dialog = inject(MatDialog);

    openDialog(): void {
        const dialogRef = this.dialog.open(FormRecipeDialogComponent, {
            width: '80%',
            height: '80%',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}
