import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FormRecipeDialogComponent} from "./components/form-recipe-dialog/form-recipe-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FormRecipeDialogComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'MyBigBurger';
    readonly dialog = inject(MatDialog);

    public constructor() {
    }


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
