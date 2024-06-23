import {Component} from "@angular/core";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";

@Component({
    selector: "app-list-ingredients",
    templateUrl: "./list-ingredients.components.html",
    styleUrl: "./list-ingredients.components.scss",
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderRow,
        MatRow
    ]
})
export class ListIngredientsComponent {

    displayedColumns: string[] = ['ingredient', 'quantity'];
    dataSource = [
        {
            ingredient: 'Ingrédient 1',
            quantity: 5
        }
    ]
}
