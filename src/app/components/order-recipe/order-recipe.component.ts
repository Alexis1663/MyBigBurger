import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RecipeComponent } from '../recipe/recipe.component';
import { CommonModule } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {OrderService} from "../../services/order.service";
import {MatSort} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-order-recipe',
  standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        MatTableModule,
        MatTable
    ],
  templateUrl: './order-recipe.component.html',
  styleUrl: './order-recipe.component.scss'
})
export class OrderRecipeComponent {

    public displayedColumns: string[] = ['name', 'description'];

    public constructor(
        public readonly orderService: OrderService
    ) {}

}
