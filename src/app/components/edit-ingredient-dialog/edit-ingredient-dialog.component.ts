import {Component, Inject, InjectionToken} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Ingredient} from "../../core/models/ingredient";

@Component({
    selector: 'app-edit-ingredient-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './edit-ingredient-dialog.component.html',
    styleUrl: './edit-ingredient-dialog.component.scss'
})
export class EditIngredientDialogComponent {

    public editForm: FormGroup = new FormGroup({});

    constructor(
        private readonly fb: FormBuilder,
        private readonly dialogRef: MatDialogRef<EditIngredientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.editForm = this.fb.group({
            name: [data.name, Validators.required],
            description: [data.description, Validators.required]
        });
    }

    onSubmit() {
        if (this.editForm.valid) {
            this.dialogRef.close(this.editForm.value);
        }
    }
}
